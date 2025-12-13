import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Garante que os caminhos dos assets sejam absolutos na raiz
  base: '/', 
  build: {
    // Força a pasta de saída ser 'dist' (padrão do Vite)
    // Isso evita confusão se o Netlify estiver esperando 'build'
    outDir: 'dist', 
  }
})