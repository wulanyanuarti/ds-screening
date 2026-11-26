import { createContext, useContext, useState, useCallback } from 'react';
const Ctx = createContext(null);
export const useScreening = () => useContext(Ctx);

// Semua state hanya di memori browser (tidak ke localStorage) agar foto & hasil pasien tidak tersimpan.
export function ScreeningProvider({ children }) {
  const [tanggal, setTanggal] = useState('');
  const [file, setFileRaw] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [saran, setSaran] = useState(null); // saran tindak lanjut dari dokter; null = belum diisi (pakai saran bawaan)

  const setFile = useCallback((f) => {
    setPreviewUrl((old) => { if (old) URL.revokeObjectURL(old); return f ? URL.createObjectURL(f) : null; });
    setFileRaw(f); setError('');
  }, []);
  const reset = useCallback(() => { setFile(null); setConsent(false); setResult(null); setError(''); setTanggal(''); setSaran(null); }, [setFile]);

  return <Ctx.Provider value={{ tanggal, setTanggal, file, setFile, previewUrl, consent, setConsent, result, setResult, error, setError, saran, setSaran, reset }}>{children}</Ctx.Provider>;
}
