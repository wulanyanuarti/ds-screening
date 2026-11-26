import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ImagePlus, ScanFace, Upload } from 'lucide-react';
import { Page, Card, Btn, Tips } from '../ui.jsx';
import { useScreening } from '../state.jsx';
import { useAuth } from '../auth.jsx';

const OK = ['image/jpeg', 'image/png'];
const MAX = 4 * 1024 * 1024; // batas body Vercel Functions ~4,5 MB

const formatTanggal = (t) => t ? new Date(`${t}T00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

// Kolom ringkasan yang hanya bisa dibaca (diisi di langkah sebelumnya)
const Field = ({ label, value }) => (
  <div><p className="mb-2 text-[13px] font-semibold">{label}</p>
    <div className="flex h-12 items-center rounded-xl border border-line bg-white px-4 text-[13px] text-muted">{value}</div></div>
);

export default function Unggah() {
  const { tanggal, file, setFile, previewUrl, consent, setConsent, error, setError } = useScreening();
  const { user } = useAuth();
  const nav = useNavigate(); const input = useRef();
  const [drag, setDrag] = useState(false);
  useEffect(() => { if (!tanggal) nav('/skrining/pasien', { replace: true }); }, [tanggal, nav]);

  const pick = (f) => {
    if (!f) return;
    if (!OK.includes(f.type)) { setFile(null); return setError('Format berkas tidak didukung. Gunakan JPEG atau PNG.'); }
    if (f.size > MAX) { setFile(null); return setError('Ukuran berkas melebihi 4 MB. Kompres atau ambil ulang foto.'); }
    setFile(f);
  };
  const ready = file && consent;
  return (
    <Page step={2}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Card className="flex w-full flex-col gap-6 lg:w-[764px]">
          <div><h2 className="font-nunitoSans text-[23px] font-extrabold">Data input skrining</h2>
            <p className="mt-2 text-sm text-muted">{error ? 'Perbaiki berkas foto sebelum melanjutkan analisis.' : 'Unggah foto dan berikan persetujuan untuk memulai analisis.'}</p></div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold">Pasien &amp; pemeriksaan</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Pasien" value="Tidak ditautkan" />
              <Field label="No. Rekam Medis" value="Tanpa tautan rekam medis" />
              <Field label="Dokter pemeriksa" value={`${user.name} — ${user.role}`} />
              <Field label="Tanggal pemeriksaan" value={formatTanggal(tanggal)} />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-sm font-semibold">Unggah Citra Wajah (Statis)</p>
            {error && <div role="alert" className="flex items-start gap-3 rounded-xl border border-dangerline bg-dangerbg p-4"><AlertCircle size={18} className="mt-0.5 shrink-0 text-danger" />
              <div><p className="text-[13px] font-semibold text-danger">{error}</p><p className="text-xs text-body">Berkas ditolak dan tidak diproses. Pilih foto yang sesuai.</p></div></div>}
            <div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files[0]); }}
              className={`flex min-h-[224px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-6 text-center ${error ? 'border-dangerline bg-bg' : 'border-[#B4D4B9] bg-pale'} ${drag ? 'ring-2 ring-brand' : ''}`}>
              {previewUrl ? <img src={previewUrl} alt="Pratinjau foto yang diunggah" className="max-h-[180px] object-contain" /> : <>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-mint text-brand"><Upload aria-hidden="true" /></span>
                <span className="text-sm font-semibold">Tarik foto ke sini atau pilih dari perangkat</span></>}
              <button type="button" onClick={() => input.current.click()} className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-4 text-[13px] font-semibold text-brand">
                <ImagePlus size={16} aria-hidden="true" />{previewUrl ? 'Ganti foto' : 'Pilih foto'}</button>
              <span className="text-xs text-muted">JPEG/PNG • Maks 4 MB • Hanya wajah, dari atas kepala sampai bawah dagu • Pencahayaan baik • 1 wajah</span>
            </div>
            <input ref={input} type="file" accept="image/jpeg,image/png" hidden onChange={(e) => { pick(e.target.files[0]); e.target.value = ''; }} />
            {file && <div className="flex items-center justify-between text-[13px]"><span className="font-semibold">{file.name} <span className="font-normal text-muted">• {(file.size / 1024).toFixed(0)} KB</span></span>
              <button type="button" className="font-semibold text-muted" onClick={() => setFile(null)}>Hapus</button></div>}
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-sm font-semibold">Persetujuan penggunaan foto *</p>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-pale p-4"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-5 w-5 accent-[#257A50]" />
              <span className="text-[13px] leading-relaxed">Saya menyatakan bahwa saya memiliki izin untuk memakai foto ini untuk keperluan skrining. Sistem memproses di memori dan tidak menyimpan foto pasien.</span></label>
          </div>
          <hr className="border-line" />
          <div className="flex flex-wrap items-center gap-3">
            <Btn disabled={!ready} onClick={() => { setError(''); nav('/skrining/analisis'); }}><ScanFace size={18} aria-hidden="true" />Proses Analisis AI</Btn>
            <Btn to="/skrining/pasien" variant="outline">Kembali ke pengaturan</Btn>
          </div>
          <p className="-mt-3 text-xs text-muted">{ready ? 'Siap dianalisis.' : 'Tombol aktif setelah foto diunggah dan persetujuan dicentang.'}</p>
        </Card>
        <Tips />
      </div>
    </Page>
  );
}
