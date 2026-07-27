import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 代码分割：将第三方库（mermaid 等）拆分为独立 chunk，减小首屏体积
    rollupOptions: {
      output: {
        manualChunks: {
          mermaid: ['mermaid'],
          vue: ['vue']
        }
      }
    },
    // 启用 gzip 压缩提示（部署时配合 CDN 压缩）
    chunkSizeWarningLimit: 600
  }
})
