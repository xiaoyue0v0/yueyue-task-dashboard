// 网易云「我喜欢的音乐」代理
// 做法：代理到成熟的 NeteaseCloudMusicApi 后端（与开源 CloudMusicAnalyst 同款方案），
// 不再手写 weapi 加密（手写版容易被网易云风控返回空 body）。
//
// 端点：
//   GET /.netlify/functions/ncm?uid=XXXX
// 返回：{ ok, playlistId, count, list:[{id,name,artist,coverUrl}] }
//
// 后端地址可配：在 Netlify 控制台设置环境变量 NCM_API_BASE 即可换成你自己部署的实例。
// 默认用 CloudMusicAnalyst 项目同款公开备份实例。
const NCM_API_BASE = (process.env.NCM_API_BASE || 'https://netease-cloud-music-api-backup-94lcuvn5c.vercel.app').replace(/\/$/, '');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8'
};

// 简易内存缓存：同一 uid 一小时只抓一次，避免频繁打上游
const cache = new Map();

async function ncmGet(path, query) {
  const url = `${NCM_API_BASE}${path}?${query}`;
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
