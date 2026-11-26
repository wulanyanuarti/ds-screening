import { Page, Card, Btn, Disclaimer } from '../ui.jsx';
import ReportView from '../ReportView.jsx';
import { SAMPLE } from '../lib/sample.js';

export default function LaporanContoh() {
  return (
    <Page step={4} badge="Contoh tampilan">
      <div className="flex flex-col gap-6 lg:flex-row">
        <ReportView result={SAMPLE} sample />
        <Card className="w-full !p-6"><h2 className="font-nunitoSans text-[21px] font-extrabold">Input contoh</h2>
          <p className="mt-2 text-xs text-muted">Token contoh: CONTOH-001 • contoh-citra.png • Bukan data pasien.</p>
          <Btn to="/skrining/pasien" variant="outline" className="mt-5">Skrining baru</Btn></Card>
      </div>
      <Disclaimer />
    </Page>
  );
}
