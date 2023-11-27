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
import { createProxyMiddleware } from 'http-proxy'
import { fileURLToPath, URL } from 'node:url'

export default {
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  server: {
    before: (app) => {
      app.use(
        '/api',
        createProxyMiddleware({
          target: 'https://oauth.vk.com',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '' // remove the '/api' prefix in the proxy request
          },
        })
      );
    },
  },
}
