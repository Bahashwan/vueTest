<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1 v-if="status">if this window didn't close AutoMattecly</h1>
    <button @click="closeWindow" v-if="status">Click Here To Close</button>
  </div>
</template>

<script>
export default {
  data() {
    return { 
        status: false,
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.hash.substr(1))
    // console.log(params)
    const accessToken = params.get('access_token')

    if (accessToken) {
      this.status = true
      this.closeWindow()
    }
  },
  methods: {
    closeWindow() {
      const duration = 3000
      setTimeout(() => {
        window.close()
      }, duration)
    }
  }
}
</script>
