import { AlertTriangle, ImageIcon } from 'lucide-react';
import { Card } from './ui.jsx';

export const FOLLOWUP = {
  DS: 'Prediksi kelas DS perlu dievaluasi lebih lanjut. Sarankan konsultasi ke dokter anak atau dokter spesialis genetika untuk pemeriksaan lanjutan.',
  NORMAL: 'Model tidak menandai indikasi DS pada citra ini. Hasil tidak menyingkirkan Down syndrome; tetap lakukan evaluasi klinis bila ada kecurigaan.',
};
const Ph = ({ label }) => <div className="grid h-40 w-full place-items-center rounded-xl bg-fog text-xs text-muted"><div className="text-center"><ImageIcon className="mx-auto mb-2" />{label}</div></div>;

export default function ReportView({ result, imageUrl, sample, meta, saran, onSaran }) {
  const bawaan = FOLLOWUP[result.predicted_class];
  const ds = result.predicted_class === 'DS';
  return (
    <Card className="flex w-full flex-col gap-5 lg:w-[792px]">
      <div>
        <h2 className="font-nunitoSans text-2xl font-extrabold">Hasil Skrining Awal</h2>
        {sample ? <p className="mt-2 text-sm font-semibold text-warn">Contoh hasil — bukan hasil pasien</p>
          : <p className="mt-2 text-xs text-muted">Dokter: {meta.dokter} • Tanggal pemeriksaan: {meta.tanggal} • Pasien: tanpa tautan rekam medis • Model: {result.model} • ID: {result.request_id}</p>}
      </div>
      <hr className="border-line" />
      <div>
        <p className="text-sm font-bold">Hasil model</p>
        <div className="flex items-center gap-5 border-b border-line py-3.5"><span className="w-[196px] text-sm text-body">Prediksi kelas</span>
          <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${ds ? 'bg-warnbg text-warn' : 'bg-pale text-brand'}`}>{result.predicted_class}</span></div>
        <div className="flex items-center gap-5 py-3.5"><span className="w-[196px] text-sm text-body">Skor keyakinan model</span>
          <span className="text-lg font-bold">{result.confidence.toFixed(1)}%</span>
          <span className="flex-1 text-xs text-muted">Keyakinan model pada kelas prediksi, bukan probabilitas atau kepastian diagnosis klinis.</span></div>
      </div>
      {result.warnings.map((w) => (
        <div key={w.code} className="flex items-start gap-3 rounded-xl bg-warnbg p-4"><AlertTriangle size={20} className="shrink-0 text-warn" />
          <div><p className="text-[13px] font-bold text-warn">Peringatan kualitas foto</p><p className="text-[13px]">{w.message}</p></div></div>))}
      <div>
        <p className="mb-3 text-sm font-bold">Citra asli dan visualisasi model</p>
        <div className="grid grid-cols-2 gap-4">
          <figure>{imageUrl ? <img src={imageUrl} alt="Citra asli" className="h-40 w-full rounded-xl object-contain bg-fog" /> : <Ph label="Citra asli (placeholder)" />}<figcaption className="mt-2 text-xs font-semibold text-body">Citra asli</figcaption></figure>
          <figure>{result.gradcam_image ? <img src={result.gradcam_image} alt="Grad-CAM" className="h-40 w-full rounded-xl object-contain bg-fog" /> : <Ph label="Grad-CAM (placeholder)" />}<figcaption className="mt-2 text-xs font-semibold text-body">Grad-CAM</figcaption></figure>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">Warna hangat menunjukkan area yang berkontribusi pada prediksi model, bukan penanda kelainan.</p>
      </div>
      <div className="rounded-xl bg-[#F7F6F1] p-5">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="saran" className="text-sm font-bold">Saran tindak lanjut</label>
          {onSaran && saran !== bawaan && <button type="button" onClick={() => onSaran(bawaan)} className="no-print text-xs font-semibold text-brand underline">Kembalikan saran bawaan</button>}
        </div>
        {onSaran ? <>
          <p className="no-print mt-1 text-xs text-muted">Diisi oleh dokter pemeriksa. Teks di kolom ini yang tercetak pada laporan.</p>
          <textarea id="saran" rows={4} maxLength={1000} value={saran} onChange={(e) => onSaran(e.target.value)} placeholder="Tulis saran tindak lanjut untuk pasien ini."
            className="no-print mt-3 w-full resize-y rounded-xl border border-line bg-white p-3.5 text-sm leading-relaxed outline-none focus:border-brand focus:ring-2 focus:ring-mint" />
          <p className="no-print mt-1 text-right text-[11px] text-muted">{saran.length}/1000</p>
          <p className="mt-2 hidden whitespace-pre-wrap text-sm leading-relaxed print:block">{saran.trim() || '—'}</p>
        </> : <p className="mt-2 text-sm leading-relaxed">{bawaan}</p>}
      </div>
      <div><p className="text-sm font-bold">Catatan klinis</p><p className="mt-2 text-[13px] leading-relaxed text-muted">Hasil skrining ini merupakan alat bantu awal, bukan diagnosis. Perhatikan kualitas foto dan lakukan evaluasi klinis sebelum menentukan langkah berikutnya.</p></div>
    </Card>
  );
}
