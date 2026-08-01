// 网易云「我喜欢的音乐」代理（无登录、纯公开数据）
// GET /.netlify/functions/ncm?uid=XXXX
// 返回 { ok, count, list:[{id,name,artist,coverUrl}] }
const crypto = require('crypto');

const MODULUS = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b72515252c526534831538bef1d0a7a7bdef8113e4714c7485e5b4f2f9eecaa4aac5d4c0e6a6c0c0a8a8';
const PUB_EXP = '010001';
const IV = '0102030405060708';
const NONCE = '0CoJUm6Qyw8W8jud';

function createSecretKey(size = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < size; i++) key += chars[Math.floor(Math.random() * chars.length)];
  return key;
}

function aesEncrypt(text, key) {
  const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key, 'utf8'), Buffer.from(IV, 'utf8'));
  return Buffer.concat([cipher.update(Buffer.from(text, 'utf8')), cipher.final()]).toString('base64');
}

function rsaEncrypt(text) {
  const reversed = text.split('').reverse().join('');
  const big = BigInt('0x' + Buffer.from(reversed).toString('hex'));
  const enc = (big ** BigInt('0x' + PUB_EXP)) % BigInt('0x' + MODULUS);
  return enc.toString(16).padStart(256, '0');
}

function weapi(obj) {
  const text = JSON.stringify(obj);
  const secret = createSecretKey(16);
  const params = aesEncrypt(aesEncrypt(text, NONCE), secret);
  const encSecKey = rsaEncrypt(secret);
  return { params, encSecKey };
}

// 先 GET 首页拿到 __csrf cookie（网易云 weapi 对非登录请求要求带 cookie，否则返回空 body）
async function obtainCookie() {
  try {
    const resp = await fetch('https://music.163.com/', {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    const sc = resp.headers.get('set-cookie') || '';
    const cookies = sc.split(',').map(s => s.split(';')[0].trim()).filter(Boolean);
    const m = sc.match(/__csrf=([0-9a-fA-F]+)/);
    const csrf = m ? m[1] : '';
    return { csrf, cookie: cookies.join('; ') };
  } catch (e) {
    return { csrf: '', cookie: '' };
  }
}

async function weapiPost(url, obj, ctx) {
  const csrf = (ctx && ctx.csrf) || '';
  const body = weapi(Object.assign({ csrf_token: csrf }, obj));
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Referer': 'https://music.163.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  };
  if (ctx && ctx.cookie) headers['Cookie'] = ctx.cookie;
  const resp = await fetch(url + (url.includes('?') ? '&' : '?') + 'csrf_token=' + encodeURIComponent(csrf), {
    method: 'POST',
    headers,
    body: new URLSearchParams(body).toString()
  });
  const text = await resp.text();
  if (!text) {
    const err = new Error('网易云返回空响应（大概率被风控拦截/需要登录态）');
    err.code = 'EMPTY_BODY';
    throw err;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    const err = new Error('网易云返回非 JSON: ' + text.slice(0, 120));
    err.code = 'BAD_JSON';
    throw err;
  }
}

// 简易内存缓存：同一 uid 一小时只抓一次，避免频繁打网易云
const cache = new Map();

function normalizeSong(song) {
  const al = song.al || song.album || {};
  const artists = song.ar || song.artists || [];
  const cover = (al.picUrl || '').replace(/^http:\/\//, 'https://');
  return {
    id: song.id,
    name: song.name,
    artist: artists.map(a => a.name).filter(Boolean).join('/') || '未知歌手',
    coverUrl: cover
  };
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8'
};

exports.handler = async (event) => {
  const qs = event.queryStringParameters || {};
  const uid = qs.uid;
  if (!uid) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: '缺少 uid 参数' }) };
  }

  const cached = cache.get(uid);
  const now = Date.now();
  if (cached && now - cached.ts < 3600 * 1000) {
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true, cached: true, count: cached.list.length, list: cached.list }) };
  }

  try {
    const ctx = await obtainCookie();

    // 1) 拿到用户的歌单列表，找「我喜欢的音乐」(specialType === 5)
    const pl = await weapiPost('https://music.163.com/weapi/user/playlist/?csrf_token=', { uid, limit: 1000, offset: 0 }, ctx);
    if (pl.code && pl.code !== 200) {
      return { statusCode: 502, headers: CORS, body: JSON.stringify({ error: '网易云拒绝请求', code: pl.code, hint: '可能是该 UID 歌单设为私密，或网易云临时限流' }) };
    }
    const playlists = pl.playlist || [];
    const liked = playlists.find(p => p.specialType === 5)
      || playlists.find(p => /喜欢|红心|liked/i.test(p.name || ''));
    if (!liked) {
      return { statusCode: 404, headers: CORS, body: JSON.stringify({ error: '未找到「我喜欢的音乐」歌单', hint: '请确认 UID 正确，且该歌单为公开' }) };
    }

    // 2) 拿歌单详情里的歌曲（最多 1000 首）
    const detail = await weapiPost('https://music.163.com/weapi/v3/playlist/detail?csrf_token=', { id: String(liked.id), n: 1000, s: 8 }, ctx);
    const songs = (detail.playlist && (detail.playlist.tracks || detail.playlist.songs)) || [];
    const list = songs.map(normalizeSong).filter(s => s.coverUrl);
    if (list.length === 0) {
      return { statusCode: 404, headers: CORS, body: JSON.stringify({ error: '歌单里没有可读取的歌曲', hint: '可能是「我喜欢的音乐」设为私密或为空' }) };
    }

    cache.set(uid, { ts: now, list });
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true, playlistId: liked.id, count: list.length, list }) };
  } catch (e) {
    const code = (e && e.code === 'EMPTY_BODY') ? 503 : 500;
    return { statusCode: code, headers: CORS, body: JSON.stringify({ error: '抓取失败', detail: String((e && e.message) || e), code: (e && e.code) || 'UNKNOWN' }) };
  }
};
