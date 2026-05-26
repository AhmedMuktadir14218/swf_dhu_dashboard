import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.136.53:9000',
        changeOrigin: true,
      },
      '/User': {
        target: 'http://192.168.136.53:9000',
        changeOrigin: true,
      },
    },
  },
})
