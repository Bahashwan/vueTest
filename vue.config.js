// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    proxy: {
      '/api.vk.com': {
        target: 'https://api.vk.com',
        changeOrigin: true,
        headers: {
          Referer: 'https://api.vk.com/',
          Origin: 'https://api.vk.com/'
        },
        rewrite: (path) => path.replace(/^\/api.vk.com/, '')
      }
    }
  }
}
