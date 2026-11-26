import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Card } from '../ui.jsx';
import { useScreening } from '../state.jsx';
import { analyze } from '../lib/api.js';

export default function Analisis() {
  const { file, previewUrl, setResult, setError } = useScreening();
  const nav = useNavigate(); const started = useRef(false);

  useEffect(() => {
    if (!file) return nav('/skrining/unggah', { replace: true });
    if (started.current) return; started.current = true; // cegah panggilan ganda (StrictMode)
    analyze(file)
      .then((r) => { setResult(r); nav('/skrining/laporan', { replace: true }); })
      .catch((e) => { setError(e.message); nav('/skrining/unggah', { replace: true }); });
  }, []); // eslint-disable-line

  return (
    <Page step={3}>
      <Card className="flex w-full flex-col gap-5 lg:w-[764px]">
        <div><h2 className="font-nunitoSans text-[23px] font-extrabold">Analisis sedang diproses</h2><p className="mt-2 text-sm text-muted">Foto dan persetujuan dikunci selama analisis berlangsung.</p></div>
        {previewUrl && <img src={previewUrl} alt="" className="h-[170px] w-full rounded-xl bg-fog object-contain" />}
        <div className="rounded-xl bg-pale p-6" role="status" aria-live="polite">
          <p className="text-sm font-semibold text-brand">Analisis sedang diproses</p>
          <div className="my-4 h-[5px] overflow-hidden rounded-full bg-line"><div className="h-full w-1/3 animate-pulse rounded-full bg-brand" /></div>
          <p className="text-[13px] leading-relaxed text-body">YOLOv8n-cls mengklasifikasikan citra, kemudian Grad-CAM menyiapkan visualisasi area yang berkontribusi pada prediksi model.</p>
          <p className="mt-2 text-xs text-muted">Tunggu hingga analisis selesai (bisa hingga ±1 menit jika layanan baru aktif). Jangan mengirim ulang foto.</p>
        </div>
      </Card>
    </Page>
  );
}
