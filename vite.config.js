import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'] // Isso previte duplicação do React
  },
  base: '/', // <--- MUDANÇA AQUI: Ponto antes da barra
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})