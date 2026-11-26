import { Page, Card, Btn, Tips } from '../ui.jsx';
import { useScreening } from '../state.jsx';

export default function SkriningAwal() {
  const { reset } = useScreening();
  return (
    <Page subtitle="Skrining awal • YOLOv8n-cls • Grad-CAM">
      <div className="flex flex-col gap-6 lg:flex-row">
        <Card className="flex w-full flex-col gap-6 lg:w-[764px]">
          <div><h2 className="font-nunitoSans text-[23px] font-extrabold">Data input skrining</h2><p className="mt-2 text-sm text-muted">Unggah foto dan berikan persetujuan untuk memulai analisis.</p></div>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-body"><li>Atur pasien & tanggal pemeriksaan.</li><li>Unggah foto wajah frontal (JPEG/PNG) dan beri persetujuan.</li><li>Sistem menjalankan klasifikasi dan Grad-CAM.</li><li>Tinjau hasil dan unduh laporan.</li></ol>
          <p className="text-xs text-muted">Sistem memproses foto di memori dan tidak menyimpan foto pasien.</p>
          <div className="flex gap-3"><Btn to="/skrining/pasien" onClick={reset}>Mulai skrining</Btn><Btn to="/skrining/contoh" variant="outline">Lihat contoh laporan</Btn></div>
        </Card>
        <Tips />
      </div>
    </Page>
  );
}
