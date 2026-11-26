// Proxy server-side: menyembunyikan API key backend & menghindari CORS. Foto tidak disimpan.
const json = (o, s) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export default {
  async fetch(request) {
    if (request.method !== 'POST') return json({ detail: 'Method not allowed' }, 405);
    const base = process.env.BACKEND_URL;
    if (!base) return json({ detail: 'BACKEND_URL belum diatur.' }, 500);
    try {
      const form = await request.formData();
      const up = await fetch(`${base}/predict`, {
        method: 'POST', body: form,
        headers: process.env.BACKEND_API_KEY ? { 'X-API-Key': process.env.BACKEND_API_KEY } : {},
      });
      return new Response(up.body, { status: up.status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
    } catch {
      return json({ detail: 'Layanan analisis tidak dapat dihubungi. Coba lagi beberapa saat.' }, 502);
    }
  },
};
