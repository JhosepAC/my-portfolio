import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function cssNonBlocking() {
  return {
    name: 'css-non-blocking',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(.*?)">/g,
        `<link rel="preload" as="style" href="$1" onload="this.rel='stylesheet'"><noscript><link rel="stylesheet" crossorigin href="$1"></noscript>`
      )
    }
  }
}

export default defineConfig({
  plugins: [react(), cssNonBlocking()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-router': ['react-router-dom'],
          'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        }
      }
    }
  }
})
