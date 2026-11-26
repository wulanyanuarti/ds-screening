import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Stethoscope } from 'lucide-react';
import { useAuth } from '../auth.jsx';

export default function Login() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const from = useLocation().state?.from || '/';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) return <Navigate to={from} replace />;

  const submit = (e) => {
    e.preventDefault();
    if (login(username, password)) nav(from, { replace: true });
    else { setError('Nama pengguna atau kata sandi salah.'); setPassword(''); }
  };
  const field = 'h-12 w-full rounded-xl border border-line bg-white px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-mint';

  return (
    <div className="grid min-h-screen place-items-center bg-bg px-6 py-10">
      <main className="w-full max-w-[420px]">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <span className="grid h-[42px] w-[42px] place-items-center rounded-xl bg-mint text-brand"><Stethoscope size={24} /></span>
          <span className="font-nunitoSans text-[25px] font-extrabold">RS Hasan Sadikin</span>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-5 rounded-[20px] border border-line bg-white p-8">
          <div>
            <h1 className="font-nunitoSans text-2xl font-extrabold">Masuk ke portal</h1>
            <p className="mt-1.5 text-sm text-muted">Khusus dokter pemeriksa. Masuk untuk memakai alat skrining Down Syndrome.</p>
          </div>
          {error && <div role="alert" className="flex items-start gap-3 rounded-xl border border-dangerline bg-dangerbg p-3.5">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-danger" /><p className="text-[13px] font-semibold text-danger">{error}</p></div>}
          <div>
            <label htmlFor="username" className="mb-2 block text-[13px] font-semibold">Nama pengguna</label>
            <input id="username" autoComplete="username" autoFocus required value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }} className={field} />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-[13px] font-semibold">Kata sandi</label>
            <input id="password" type="password" autoComplete="current-password" required value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }} className={field} />
          </div>
          <button type="submit" className="h-[46px] rounded-xl bg-brand px-5 text-sm font-semibold text-white">Masuk</button>
        </form>
        <p className="mt-4 text-center text-xs leading-relaxed text-muted">Alat bantu skrining awal, bukan diagnosis. Foto pasien diproses di memori dan tidak disimpan.</p>
      </main>
    </div>
  );
}
