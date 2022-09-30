import * as fs from 'fs'
import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: false
  },
  plugins: [vue(), eslint()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@icons': path.resolve(__dirname, './src/assets/icons'),
      '@views': path.resolve(__dirname, './src/views')
    }
  },
  server: {
    port: 8443,
    https: {
      key: fs.readFileSync('./.cert/key.pem'),
      cert: fs.readFileSync('./.cert/cert.pem'),
      passphrase: 'localhost'
    },
    host: true,
    fs: {
      deny: ['.env', '.env.*', '*.{pem,crt}']
    }
  }
})
