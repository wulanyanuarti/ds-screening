import { useNavigate } from 'react-router-dom';
import { Page, Card, Btn, Tips } from '../ui.jsx';
import { useAuth } from '../auth.jsx';
import { useScreening } from '../state.jsx';

export default function Pasien() {
  const { tanggal, setTanggal } = useScreening();
  const nav = useNavigate();
  const { user } = useAuth();
  const today = new Date().toISOString().slice(0, 10);
  const valid = tanggal && tanggal <= today;
  return (
    <Page step={1}>
      <div className="flex flex-col gap-6 lg:flex-row">
        <Card className="flex w-full flex-col gap-6 lg:w-[764px]">
          <div><h2 className="font-nunitoSans text-[23px] font-extrabold">Pasien & pemeriksaan</h2><p className="mt-2 text-sm text-muted">Siapkan konteks pemeriksaan sebelum mengunggah foto.</p></div>
          <div className="space-y-3">
            <label className="flex gap-3 rounded-xl border border-line p-4 opacity-60"><input type="radio" disabled /><span><b className="block text-sm">Tautkan rekam medis pasien</b><span className="text-xs text-muted">Memerlukan integrasi SIMRS — belum tersedia.</span></span></label>
            <label className="flex gap-3 rounded-xl border border-brand bg-pale p-4"><input type="radio" checked readOnly /><span><b className="block text-sm text-brand">Lanjut tanpa tautan rekam medis</b><span className="text-[13px] text-body">Pemeriksaan tidak ditautkan ke rekam medis pasien.</span></span></label>
          </div>
          <hr className="border-line" />
          <div className="grid grid-cols-2 gap-4">
            <div><p className="mb-2 text-[13px] font-semibold">Dokter pemeriksa</p><div className="flex h-12 items-center rounded-xl border border-line px-4 text-[13px] text-muted">{user.name} — {user.role}</div></div>
            <div><label htmlFor="tgl" className="mb-2 block text-[13px] font-semibold">Tanggal pemeriksaan *</label>
              <input id="tgl" type="date" max={today} value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="h-12 w-full rounded-xl border border-line px-4 text-[13px]" /></div>
          </div>
          <p className="text-xs text-muted">* Tanggal pemeriksaan wajib diisi untuk melanjutkan.</p>
          <hr className="border-line" />
          <div className="flex justify-between"><Btn to="/skrining" variant="outline">Kembali</Btn><Btn disabled={!valid} onClick={() => nav('/skrining/unggah')}>Lanjut ke unggah</Btn></div>
        </Card>
        <Tips />
      </div>
    </Page>
  );
}
