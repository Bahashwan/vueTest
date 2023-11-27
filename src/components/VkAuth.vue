<!-- eslint-disable vue/multi-word-component-names -->
<script></script>
<template>
  <div>
    <button @click="openAuthorizationUrl" v-if="status">LogIn VK</button>
  </div>
  <div>

    <button @click="logOut" v-if="logoutStatus">LogOut VK</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: true,
      logoutStatus:false,
      VKtoken: ''
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.hash.substr(1))
    const localStorageToken = localStorage.getItem('token')
    const accessToken = params.get('access_token')
    if (accessToken || localStorageToken) {
      this.status = false
      this.logoutStatus = true
    }
  },
  methods: {
    openAuthorizationUrl() {
      const url = new URL('https://oauth.vk.com/authorize')
      url.searchParams.set('client_id', '51802731')
      url.searchParams.set('redirect_uri', `${window.location.href}`)
      url.searchParams.set('display', 'mobile')
      url.searchParams.set('scope', 'offline,friends')
      url.searchParams.set('response_type', 'token')
      url.searchParams.set('v', '5.131')

      const newWindow = window.open(url.toString(), '_blank')

      const intervalId = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(intervalId)

          const params = new URLSearchParams(newWindow.location.hash.substr(1))
          console.log(params)
          const accessToken = params.get('access_token')

          if (accessToken) {
            this.VKtoken = accessToken
            localStorage.setItem('token', accessToken)
            this.status = false
          }
        }
      }, 500)
    },
    logOut() {
      localStorage.token = ''
      window.location.href = `${window.location.href}`
    }
  }
}
</script>

<style lang="scss" scoped></style>
