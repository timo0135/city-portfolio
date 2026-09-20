import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // chemins relatifs : déployable à la racine d'un domaine comme dans un sous-dossier
  base: './',
  server: { host: true, port: 5174 },
  build: { outDir: 'dist', assetsDir: 'assets' }
})
