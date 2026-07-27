import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

/** Строгий CSP в проде, послабления для HMR в режиме разработки. */
function cspPlugin(): Plugin {
  return {
    name: 'aftof-csp',
    transformIndexHtml(html, ctx) {
      const shared = "default-src 'self'; img-src 'self' data: blob: aftof-file:; style-src 'self' 'unsafe-inline'"
      const policy = ctx.server
        ? `${shared}; script-src 'self' 'unsafe-inline'; connect-src 'self' ws: http://localhost:*`
        : `${shared}; script-src 'self'`
      return html.replace('%CSP%', policy)
    }
  }
}

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: resolve(__dirname, 'src/renderer'),
    build: {
      rollupOptions: {
        input: resolve(__dirname, 'src/renderer/index.html')
      }
    },
    resolve: {
      alias: {
        '@shared': resolve(__dirname, 'src/shared')
      }
    },
    plugins: [react(), cspPlugin()]
  }
})
