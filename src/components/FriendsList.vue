<template>
  <div><button @click="getFriends">friends</button></div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      freindsIds: [],
      friendsList: [],
      friensPhotos: [],
      combined: [],
      token: localStorage.getItem('token')
    }
  },
  methods: {
    fetchUsers(id) {
      let config = {
        method: 'get',
        url: 'https://api.vk.com/method/users.get',
        params: {
          access_token: this.token,
          v: '5.131',
          user_ids: id
        }
      }

      // eslint-disable-next-line no-unused-vars
      let configOnLocalHost = {
        method: 'get',
        url: 'https://cors-anywhere.herokuapp.com/https://api.vk.com/method/users.get',
        params: {
          access_token: this.token,
          v: '5.131',
          user_ids: id
        }
      }
      axios.request(config).then((data) => {
        //
        const user = data.data.response
        if (user) {
          this.friendsList.push(user[0])
        }
      })
    },
    getFriends() {
      let config = {
        method: 'get',
        url: 'https://api.vk.com/method/friends.get',
        params: {
          access_token: this.token,
          v: '5.131'
        }
      }

      // eslint-disable-next-line no-unused-vars
      let configOnLocalHost = {
        method: 'get',
        url: 'https://cors-anywhere.herokuapp.com/https://api.vk.com/method/friends.get',
        params: {
          access_token: this.token,
          v: '5.131'
        }
      }
      axios
        .request(config)
        .then((data) => {
          const allData = data.data.response.items
          this.freindsIds = allData
          allData.forEach((userId) => {
            this.fetchUsers(userId)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
