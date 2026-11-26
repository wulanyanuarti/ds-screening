import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { RequireAuth } from './auth.jsx';
import Login from './pages/Login.jsx';
import Beranda from './pages/Beranda.jsx';
import SkriningAwal from './pages/SkriningAwal.jsx';
import LaporanContoh from './pages/LaporanContoh.jsx';
import Pasien from './pages/Pasien.jsx';
import Unggah from './pages/Unggah.jsx';
import Analisis from './pages/Analisis.jsx';
import Laporan from './pages/Laporan.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Semua halaman di bawah ini hanya bisa dibuka setelah login */}
      <Route element={<RequireAuth><Outlet /></RequireAuth>}>
        <Route path="/" element={<Beranda />} />
        <Route path="/skrining" element={<SkriningAwal />} />
        <Route path="/skrining/contoh" element={<LaporanContoh />} />
        <Route path="/skrining/pasien" element={<Pasien />} />
        <Route path="/skrining/unggah" element={<Unggah />} />
        <Route path="/skrining/analisis" element={<Analisis />} />
        <Route path="/skrining/laporan" element={<Laporan />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
