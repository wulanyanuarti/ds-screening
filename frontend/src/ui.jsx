import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Check, FileText, Focus, LogOut, ScanFace, Stethoscope, Sun, User } from 'lucide-react';
import { useAuth } from './auth.jsx';
import { useScreening } from './state.jsx';
import { DISCLAIMER } from './lib/sample.js';

export function Header() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { reset } = useScreening();
  const nav = useNavigate();
  const keluar = () => { reset(); logout(); nav('/login', { replace: true }); }; // hapus foto & hasil dari memori saat keluar
  const item = (label, to, active) => to
    ? <Link to={to} className={`h-[42px] px-3.5 flex items-center rounded-xl text-[13px] ${active ? 'bg-mint text-brand font-semibold' : 'text-body font-medium'}`}>{label}</Link>
    : <span className="h-[42px] px-3.5 flex items-center text-[13px] font-medium text-body opacity-60" title="Belum tersedia">{label}</span>;
  return (
    <header className="no-print flex h-[88px] w-full items-center justify-between border-b border-line bg-white px-6 lg:px-12">
      <Link to="/" className="flex items-center gap-2.5">
        <span className="grid h-[38px] w-[38px] place-items-center rounded-xl bg-mint text-brand"><Stethoscope size={22} /></span>
        <span className="font-nunitoSans text-[23px] font-extrabold">RS Hasan Sadikin</span>
      </Link>
      <nav className="hidden items-center gap-1.5 md:flex">
        {item('Beranda', '/', pathname === '/')}
        {item('Rekam Medis Pasien')}
        {item('Tools', '/skrining', pathname.startsWith('/skrining'))}
        {item('Pengaturan')}
      </nav>
      <div className="flex items-center gap-2.5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-pale text-[13px] font-bold text-brand">{user.initials}</span>
        <div className="hidden sm:block"><p className="text-[13px] font-semibold">{user.name}</p><p className="text-[11px] text-muted">{user.role}</p></div>
        <button type="button" onClick={keluar} className="ml-2 flex h-[38px] items-center gap-2 rounded-xl border border-line px-3 text-[13px] font-semibold text-body"><LogOut size={16} />Keluar</button>
      </div>
    </header>
  );
}

export const Card = ({ className = '', children }) => <section className={`print-card rounded-[20px] border border-line bg-white p-7 ${className}`}>{children}</section>;

const V = {
  primary: 'bg-brand text-white',
  outline: 'border border-line bg-white text-brand',
  disabled: 'bg-off text-offtext cursor-not-allowed',
};
export function Btn({ to, variant = 'primary', disabled, className = '', children, ...p }) {
  const cls = `inline-flex h-[46px] items-center justify-center gap-2.5 rounded-xl px-5 text-sm font-semibold ${V[disabled ? 'disabled' : variant]} ${className}`;
  return to && !disabled ? <Link to={to} className={cls} {...p}>{children}</Link> : <button className={cls} disabled={disabled} {...p}>{children}</button>;
}

const STEPS = ['Pasien & pemeriksaan', 'Unggah & persetujuan', 'Analisis AI', 'Hasil & laporan'];
export function Stepper({ current }) {
  return (
    <ol className="no-print flex w-full items-center gap-3 px-1 py-2 sm:gap-6">
      {STEPS.map((s, i) => {
        const n = i + 1, done = n < current, now = n === current;
        return (
          <li key={s} className="flex flex-1 items-center gap-2.5">
            <span className={`grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full text-xs font-bold ${now ? 'bg-brand text-white' : done ? 'bg-mint text-brand' : 'bg-fog text-muted'}`}>{done ? <Check size={15} /> : n}</span>
            {/* Di layar kecil hanya nama langkah aktif yang tampil, agar tidak melebar ke samping */}
            <span className={`whitespace-nowrap text-[13px] ${now ? 'font-bold' : `hidden sm:inline ${done ? 'font-medium' : 'font-medium text-muted'}`}`}>{s}</span>
            {n < 4 && <span className="h-px flex-1 bg-line" />}
          </li>
        );
      })}
    </ol>
  );
}

export function Page({ step, crumb = 'Skrining Genetik / Down Syndrome Detection', subtitle = 'Skrining Awal Down Syndrome', badge, children }) {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="flex flex-col gap-6 px-6 pb-10 pt-[30px] lg:px-[120px]">
        <div className="no-print flex flex-col gap-5">
          <p className="text-xs text-muted">Beranda › Tools › <b className="font-semibold text-brand">{crumb}</b></p>
          <div className="flex items-center justify-between">
            <div><h1 className="font-nunitoSans text-3xl font-extrabold">Down Syndrome Detection</h1><p className="mt-1.5 text-[15px] text-muted">{subtitle}</p></div>
            {badge && <span className="rounded-full bg-pale px-3 py-1.5 text-xs font-semibold text-brand">{badge}</span>}
          </div>
          <div><p className="text-sm font-semibold">Alat bantu skrining awal, bukan diagnosis.</p>
            <p className="text-[13px] leading-relaxed text-muted">Hasil tidak menggantikan evaluasi klinis dokter. Konfirmasi Down syndrome memerlukan pemeriksaan genetik (kariotipe).</p></div>
          {step && <Stepper current={step} />}
        </div>
        {children}
      </main>
    </div>
  );
}

// Ilustrasi bingkai foto: wajah penuh dari atas kepala sampai bawah dagu.
const FrameGuide = () => (
  <svg viewBox="0 0 120 120" className="h-[92px] w-[92px] text-brand" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
    <path d="M18 30V18h12M90 18h12v12M102 90v12H90M30 102H18V90" strokeWidth="3" />
    <path d="M24 27h72M24 95h72" strokeWidth="1.5" strokeDasharray="3 4" opacity=".7" />
    <ellipse cx="60" cy="61" rx="25" ry="34" strokeWidth="2.5" />
    <circle cx="50" cy="56" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="70" cy="56" r="2.5" fill="currentColor" stroke="none" />
    <path d="M51 76q9 7 18 0" strokeWidth="2.5" />
  </svg>
);

const TIPS = [
  [User, 'Wajah menghadap kamera', 'Ambil foto frontal dan pastikan hanya ada 1 wajah.'],
  [ScanFace, 'Hanya wajah, atas kepala sampai bawah dagu', 'Foto cukup mencakup wajah dari atas kepala hingga bawah dagu. Jangan sertakan badan, bahu, atau latar yang luas.'],
  [Sun, 'Pencahayaan merata', 'Hindari bayangan kuat agar wajah terlihat jelas.'],
  [Focus, 'Citra jelas, tidak buram', 'Periksa ketajaman foto sebelum mengunggah.'],
];

export const Tips = () => (
  <div className="no-print flex w-full flex-col gap-6 lg:w-[360px] lg:shrink-0">
    <aside className="flex flex-col gap-5 rounded-[20px] bg-mint p-[26px]">
      <h2 className="font-nunitoSans text-[21px] font-extrabold leading-tight">Foto yang baik membantu skrining lebih bermakna</h2>
      <figure className="flex flex-col items-center gap-2 rounded-2xl bg-pale px-4 py-5">
        <FrameGuide />
        <figcaption className="text-center text-xs font-semibold text-brand">Panduan posisi frontal<span className="block font-normal text-body">Bingkai dari atas kepala sampai bawah dagu</span></figcaption>
      </figure>
      <ul className="flex flex-col gap-4">
        {TIPS.map(([Icon, t, d]) => (
          <li key={t} className="flex gap-3"><Icon size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
            <div><p className="text-[13px] font-bold">{t}</p><p className="text-xs leading-relaxed text-body">{d}</p></div></li>))}
      </ul>
    </aside>
    <div className="px-1">
      <p className="flex items-center gap-2.5 text-sm font-semibold"><FileText size={18} className="text-muted" aria-hidden="true" />Setelah analisis</p>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">Laporan menampilkan prediksi kelas NORMAL atau DS, visualisasi Grad-CAM, peringatan kualitas foto, dan saran tindak lanjut dari dokter. Skor menunjukkan keyakinan model, bukan probabilitas diagnosis.</p>
    </div>
  </div>
);

export const Disclaimer = () => (
  <div className="border-t border-line pt-4"><p className="text-sm font-bold">Disclaimer klinis</p><p className="mt-2 text-[13px] leading-relaxed text-muted">{DISCLAIMER}</p></div>
);
