// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    proxy: {
      '/api.vk.com': {
        target: 'https://api.vk.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api.vk.com': ''
        }
      }
    }
  }
}
