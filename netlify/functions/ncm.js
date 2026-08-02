// 网易云「我喜欢的音乐」代理
// 做法：代理到成熟的 NeteaseCloudMusicApi 后端（与开源 CloudMusicAnalyst 同款方案），
// 不再手写 weapi 加密（手写版容易被网易云风控返回空 body）。
//
// 端点：
//   GET /.netlify/functions/ncm?uid=XXXX
// 返回：{ ok, playlistId, count, list:[{id,name,artist,coverUrl}] }
//
//   GET /.netlify/functions/ncm?uid=XXXX&songId=YYYY
// 返回：{ ok, lyric: "..." }  （随机一句有效歌词，没有则空字符串）
//
// 后端地址可配：在 Netlify 控制台设置环境变量 NCM_API_BASE 指向你自己部署的 NeteaseCloudMusicApi。
// 不再默认使用任何公开第三方实例（它们经常失效/限流）。
const NCM_API_BASE = (process.env.NCM_API_BASE || '').replace(/\/$/, '');
const NCM_REALIP = (process.env.NCM_REALIP || '116.25.146.177').trim();

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8'
};

// 简易内存缓存：同一 uid 一小时只抓一次，避免频繁打上游
const cache = new Map();

async function ncmGet(path, query) {
  const sep = query ? '&' : '';
  const url = `${NCM_API_BASE}${path}?${query}${sep}realIP=${encodeURIComponent(NCM_REALIP)}`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://music.163.com/'
    }
  });
  const text = await resp.text();
  if (!text) {
    const err = new Error('NeteaseCloudMusicApi 返回空响应（上游可能限流或临时不可用）');
    err.code = 'EMPTY_BODY';
    throw err;
  }
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    const err = new Error('NeteaseCloudMusicApi 返回非 JSON: ' + text.slice(0, 120));
    err.code = 'BAD_JSON';
    throw err;
  }
  return { status: resp.status, data };
}

function normalizeSong(song) {
  const al = song.al || song.album || {};
  const artists = song.ar || song.artists || [];
  const cover = (al.picUrl || '').replace(/^http:\/\//, 'https://');
  return {
    id: song.id,
    name: song.name || '未知',
    artist: artists.map(a => a.name).filter(Boolean).join('/') || '未知歌手',
    coverUrl: cover
  };
}

function parseLrc(lrcText) {
  if (!lrcText) return [];
  return lrcText
    .split('\n')
    .map(line => {
      // [00:00.000] 歌词内容
      const m = line.replace(/\[[^\]]+\]/g, '').trim();
      return m;
    })
    .filter(line => {
      if (!line) return false;
      // 过滤 instrumental / 纯音乐 / 作词 / 作曲 / 编曲等元信息
      const low = line.toLowerCase();
      const bad = /^(作词|作曲|编曲|制作人|监制|出品|纯音乐|instrumental|歌词|词：|曲：|编：|\d+\s*分|网易|云音乐|版权所有|翻译|校对|制作)/;
      if (bad.test(line)) return false;
      if (low.includes('instrumental')) return false;
      if (low.includes('纯音乐')) return false;
      if (/^\d+$/.test(line)) return false;
      if (line.length < 3) return false;
      return true;
    });
}

function pickRandomLine(lines, seedStr) {
  if (!lines || lines.length === 0) return '';
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  const idx = h % lines.length;
  return lines[idx];
}

async function fetchLyric(songId, seedStr) {
  try {
    const { data } = await ncmGet('/lyric', 'id=' + encodeURIComponent(songId));
    const raw = (data && (data.lrc && data.lrc.lyric)) || data.lyric || '';
    const lines = parseLrc(raw);
    return pickRandomLine(lines, seedStr) || '';
  } catch (e) {
    return '';
  }
}

exports.handler = async (event) => {
  if (!NCM_API_BASE) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: '未配置 NCM_API_BASE', hint: '请在 Netlify 控制台 Site settings → Environment variables 添加 NCM_API_BASE，指向你自己部署的 NeteaseCloudMusicApi 地址（例如 https://xxx.vercel.app）' }) };
  }

  const qs = event.queryStringParameters || {};
  const uid = qs.uid;
  if (!uid) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: '缺少 uid 参数' }) };
  }

    const todayStr = new Date().toISOString().slice(0, 10);

    // 单独取歌词（按 songId）——必须放在列表缓存判断之前！
    // 否则带 songId 的请求会被列表缓存拦截，返回不含 lyric 的列表响应，导致前端永远拿不到歌词。
    const songId = qs.songId;
    if (songId) {
      try {
        const lyric = await fetchLyric(songId, uid + '|' + todayStr + '|' + songId);
        return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true, lyric }) };
      } catch (e) {
        return { statusCode: 500, headers: CORS, body: JSON.stringify({ ok: true, lyric: '', error: '歌词获取失败' }) };
      }
    }

    const cached = cache.get(uid);
    const now = Date.now();
    if (cached && now - cached.ts < 3600 * 1000) {
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true, cached: true, count: cached.list.length, list: cached.list }) };
    }

  try {
    // 1) 获取该用户的歌单列表，筛出本人创建的，再找「我喜欢的音乐」(specialType === 5)
    const { status: ps, data: pl } = await ncmGet('/user/playlist', 'uid=' + encodeURIComponent(uid) + '&limit=1000&offset=0');
    if (pl.code && pl.code !== 200) {
      return { statusCode: 502, headers: CORS, body: JSON.stringify({ error: 'NeteaseCloudMusicApi 拒绝请求', code: pl.code, hint: '上游可能限流，稍后重试' }) };
    }
    const all = pl.playlist || [];
    const mine = all.filter(p => String(p.userId) === String(uid) || (p.creator && String(p.creator.userId) === String(uid)));
    const liked = mine.find(p => p.specialType === 5)
      || mine.find(p => /喜欢|红心|liked/i.test(p.name || ''));
    if (!liked) {
      return { statusCode: 404, headers: CORS, body: JSON.stringify({ error: '未找到「我喜欢的音乐」歌单', hint: '请确认 UID 正确，且该歌单为公开' }) };
    }

    // 2) 拉歌单全部曲目（最多 1000 首）
    const { status: ts, data: tr } = await ncmGet('/playlist/track/all', 'id=' + encodeURIComponent(liked.id) + '&limit=1000&offset=0');
    const songs = tr.songs || (tr.playlist && tr.playlist.tracks) || [];
    let list = songs.map(normalizeSong).filter(s => s.coverUrl);
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
