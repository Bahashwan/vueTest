<!-- eslint-disable no-dupe-keys -->
<template>
  <div>
    <div v-html="apiResponse" ref="apiContent"></div>
    <div class="your-param-selector">{{ params }}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      apiResponse: '' // Initial empty response
    }
  },
  mounted() {
    this.makeApiRequest()
  },
  methods: {
    async makeApiRequest() {
      try {
        const response = await axios.get(
          'https://cors-anywhere.herokuapp.com/https://oauth.vk.com/authorize?client_id=51802731&redirect_uri=https://oauth.vk.com/blank.html&display=page&scope=offline,friends,&response_type=token&v=5.131',
          {
            params: {
              client_id: '51802731',
              redirect_uri: 'https://oauth.vk.com/blank.html',
              display: 'popup',
              scope: 'offline,friends,',
              response_type: 'token',
              v: '5.131'
            }
          }
        )
        this.apiResponse = response.data
      } catch (error) {
        console.error(error)
      }
    }
  },
  updated() {
    this.getParamsFromPage()
  },
  methods: {
    getParamsFromPage() {
      const params = this.$refs.apiContent.querySelectorAll('.your-param-selector')
      // Process or use the retrieved params as needed
    }
  }
}
</script>
