import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Dev: /api/analyze -> FastAPI lokal (/predict). Produksi: ditangani api/analyze.js di Vercel.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api/analyze': { target: 'http://localhost:8000', rewrite: () => '/predict' } } },
});
