import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer } from 'lucide-react';
import { Page, Btn, Disclaimer } from '../ui.jsx';
import ReportView, { FOLLOWUP } from '../ReportView.jsx';
import { useAuth } from '../auth.jsx';
import { useScreening } from '../state.jsx';

export default function Laporan() {
  const { result, previewUrl, tanggal, saran, setSaran, reset } = useScreening();
  const { user } = useAuth();
  const nav = useNavigate();
  useEffect(() => { if (!result) nav('/skrining', { replace: true }); }, [result, nav]);
  if (!result) return null;
  return (
    <Page step={4}>
      <ReportView result={result} imageUrl={previewUrl} meta={{ dokter: `${user.name} — ${user.role}`, tanggal }}
        saran={saran ?? FOLLOWUP[result.predicted_class]} onSaran={setSaran} />
      <Disclaimer />
      <div className="no-print flex flex-wrap gap-3">
        <Btn onClick={() => window.print()}><Printer size={18} />Unduh PDF</Btn>
        <Btn variant="outline" onClick={() => window.print()}>Cetak laporan</Btn>
        <Btn to="/" variant="outline" onClick={reset}>Kembali ke beranda</Btn>
        <Btn to="/skrining/pasien" variant="outline" onClick={reset}>Skrining baru</Btn>
      </div>
      <p className="no-print text-xs text-muted">Foto dan hasil hanya ada di memori browser; menutup atau memuat ulang halaman akan menghapusnya. Simpan PDF sebelum keluar.</p>
    </Page>
  );
}
