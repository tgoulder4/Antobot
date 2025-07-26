import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],
  server: {
    watch: {
      usePolling: true
    },
    host: '0.0.0.0',
    port: 5173

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})