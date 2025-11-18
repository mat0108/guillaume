import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,               // accessible depuis réseau local
    port: 5173,
    hmr: {
      protocol: 'wss',        // WebSocket sécurisé
      host: '0.0.0.0',        // autorise tous les devices
      clientPort: 5173
    },
    allowedHosts: ['panels-patent-eugene-collectors.trycloudflare.com']       // autorise tous les tunnels
  }
})
