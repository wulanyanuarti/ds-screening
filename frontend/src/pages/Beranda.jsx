import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Card } from '../ui.jsx';
import { useAuth } from '../auth.jsx';

export default function Beranda() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-bg"><Header />
      <main className="flex flex-col gap-6 px-6 pb-10 pt-8 lg:px-[120px]">
        <section className="rounded-[28px] bg-mint p-9">
          <p className="text-xs font-bold text-brand">BERANDA PORTAL RS HASAN SADIKIN</p>
          <h1 className="mt-3.5 font-nunitoSans text-4xl font-extrabold leading-tight">Selamat datang,<br />{user.name}.</h1>
          <p className="mt-3.5 max-w-[565px] text-[15px] leading-relaxed text-body">Selamat beraktivitas di portal internal RS Hasan Sadikin. Mulai dari rekam medis pasien untuk memantau kunjungan, evaluasi, dan tindak lanjut pelayanan.</p>
        </section>
        <Card><h2 className="font-nunitoSans text-[22px] font-extrabold">Mulai dari rekam medis pasien</h2>
          <p className="mb-4 mt-1.5 text-sm text-muted">Temukan rekam medis untuk melanjutkan evaluasi klinis.</p>
          <div className="flex gap-3"><div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-line bg-bg px-4 text-sm text-muted"><Search size={18} />Cari dengan nama pasien atau nomor rekam medis</div>
            <button disabled className="h-[46px] rounded-xl bg-brand px-5 text-sm font-semibold text-white opacity-60">Cari rekam medis</button></div></Card>
        <div className="flex flex-col gap-6 lg:flex-row">
          <Card className="w-full !p-6 lg:w-[360px]"><h2 className="font-nunitoSans text-xl font-extrabold">Akses cepat</h2>
            <Link to="/skrining" className="mt-4 block rounded-[14px] border border-line bg-bg p-3.5"><p className="text-sm font-semibold">Tools</p><p className="text-xs text-muted">Skrining Genetik • Down Syndrome Detection</p></Link></Card>
          <Card className="flex-1 !p-6"><h2 className="font-nunitoSans text-xl font-extrabold">Riwayat pemeriksaan terbaru</h2>
            <p className="mt-1 text-[13px] text-muted">Tidak ada data pasien yang tersedia untuk ditampilkan.</p>
            <div className="mt-4 rounded-2xl border border-line bg-bg p-5"><p className="text-sm font-semibold">Tidak ada data pasien untuk ditampilkan</p>
              <p className="mt-2 text-[13px] text-muted">Gunakan pencarian rekam medis untuk membuka data pasien, lalu riwayat pemeriksaan terbaru akan ditampilkan di area ini.</p></div></Card>
        </div>
      </main>
    </div>
  );
}
