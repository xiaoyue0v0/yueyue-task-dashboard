// 网易云封面图代理：把图抓回来并带上 CORS 头，供前端 Canvas 像素化
// GET /.netlify/functions/ncm-cover?url=<encoded cover url>
const ALLOWED_HOSTS = [
  'p.pimg.netease.com',
  'p.music.126.net',
  'p1.music.126.net',
  'p2.music.126.net',
  'p3.music.126.net',
  'p4.music.126.net',
  'p.yd.126.net',
  'music.163.com'
];

exports.handler = async (event) => {
  const qs = event.queryStringParameters || {};
  const target = qs.url;
  if (!target) return { statusCode: 400, body: 'missing url' };

  let u;
  try { u = new URL(target); } catch { return { statusCode: 400, body: 'bad url' }; }
  if (u.protocol !== 'https:' || !ALLOWED_HOSTS.includes(u.hostname)) {
    return { statusCode: 403, body: 'forbidden host' };
  }

  try {
    const resp = await fetch(target, {
      headers: { 'Referer': 'https://music.163.com/', 'User-Agent': 'Mozilla/5.0' }
    });
    if (!resp.ok) return { statusCode: 502, body: 'upstream error ' + resp.status };
    const buf = Buffer.from(await resp.arrayBuffer());
    const ct = resp.headers.get('content-type') || 'image/jpeg';
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': ct,
        'Cache-Control': 'public, max-age=86400'
      },
      body: buf.toString('base64'),
      isBase64Encoded: true
    };
  } catch (e) {
    return { statusCode: 500, body: 'proxy error: ' + String((e && e.message) || e) };
  }
};
