const URL_ANALYZE = '/api/analyze';
export async function analyze(file) {
  const form = new FormData();
  form.append('file', file);
  let res;
  try { res = await fetch(URL_ANALYZE, { method: 'POST', body: form }); }
  catch { throw new Error('Tidak dapat terhubung ke layanan analisis. Periksa koneksi Anda.'); }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.detail || `Analisis gagal (kode ${res.status}).`);
  return body;
}
