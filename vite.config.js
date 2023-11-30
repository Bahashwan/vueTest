// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig, createProxy } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/path/to/your/src/folder'
    }
  },
  server: {
    proxy: {
      '/api.vk.com': {
        target: 'https://api.vk.com',
        changeOrigin: true,
        headers: {
          Referer: 'https://api.vk.com/',
          Origin: 'https://api.vk.com/'
        },
        rewrite: (path) => path.replace(/^\/api.vk.com/, ''),
      }
    }
  }
})