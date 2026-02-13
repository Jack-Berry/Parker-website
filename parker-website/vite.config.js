import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Handle CSS modules and SCSS
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // Use modern API to suppress deprecation warnings
        silenceDeprecations: ['import', 'global-builtin'],
        additionalData: ``, // Add any global SCSS imports here if needed
      },
    },
  },
})
