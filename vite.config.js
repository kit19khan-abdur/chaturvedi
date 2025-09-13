import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure all your source files are scanned
  ],
  fontFamily: {
        nunito: ['"Nunito Sans"', 'sans-serif'],
      },
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      'silly-carpets-clean.loca.lt' // <- Add your loca.lt subdomain here
    ]
  }
})
