import axios from 'axios'
import { createProxyMiddleware } from 'http-proxy-middleware';

// const config = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: 'https://oauth.vk.com/authorize?client_id=51802731&redirect_uri=https://oauth.vk.com/blank.html&display=page&scope=offline,friends,&response_type=token&v=5.131',
//   headers: {
//     Cookie:
//       'remixff=0; remixlang=0; remixlgck=72b45cdb83f9452d8b; remixstid=2135504044_XkZ6diLtfbgy6mrzICihRFIPLPRauSC9ZYJkJk8ZPCg; remixstlid=9063652619699280597_L90o8qf6s5ChS2a5kOu45BllAzTuwCzbWA7FP5ue2nw; remixua=-1%7C-1%7C52%7C1109464229'
//   }
// }

// axios
//   .request(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data))
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// export const VKauth = async () => {
//   try {
//     const res = await axios.request(config)
//   } catch (error) {
//     console.log(error)
//   }
// }



export default {
  devServer: {
    before: function(app) {
      app.use(
        '/api',
        createProxyMiddleware({
          target: 'https://api.vk.com',
          changeOrigin: true,
          pathRewrite: {
            '^/oauth': '',
          },
        })
      );
    },
  },
};
