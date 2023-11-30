<template>
  <div>
    <input v-model="inputValue" />
    <button @click="getUsers">Get Users</button>
  </div>

  <UsersList :usersList="usersList.items" />
</template>

<script>
import UsersList from './UsersList.vue'
import axios from 'axios'
export default {
  data() {
    return { VkToken: '', inputValue: '', usersList: [], usersPhotos: [], combined: [] }
  },
  mounted() {
    this.VkToken = localStorage.getItem('token')
  },
  methods: {
    getUsers() {

      let config={
        url:'https://api.vk.com/method/users.search',
        params:{
          access_token:this.VkToken,
          v:'5.131',
          q:this.inputValue
        }
      }

      // eslint-disable-next-line no-unused-vars
      let configOnLocalHost={
        url:'https://cors-anywhere.herokuapp.com/https://api.vk.com/method/users.search',
        params:{
          access_token:this.VkToken,
          v:'5.131',
          q:this.inputValue
        }
      }

        axios.request(config)
        .then((data) => {
          this.usersList = data.data.response
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => console.log(err))
    },
    getUserPhoto(userId) {
      let config = {
        method: 'get',
        url: 'https://api.vk.com/method/photos.getAll',
        params: {
          access_token: localStorage.getItem('token'),
          v: '5.131',
          count: '1',
          user_id: userId
        }
      }

      // eslint-disable-next-line no-unused-vars
      let configOnLocalHost = {
        method: 'get',
        url: 'https://cors-anywhere.herokuapp.com/https://api.vk.com/method/photos.getAll',
        params: {
          access_token: localStorage.getItem('token'),
          v: '5.131',
          count: '1',
          user_id: userId
        }
      }

      axios
        .request(config)
        .then((response) => {
          this.usersPhotos.push(response.data.response /*.items[0].sizes[1].url*/)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    combineUrlWithArr2(photoObj, userList) {
      const url = photoObj.items[0].sizes[1].url
      console.log(url)
      const updatedUserList = userList.map((obj) => {
        if (obj.id === photoObj.id) {
          return { ...obj, url }
        }
        return obj
      })

      return updatedUserList
    }
  },
  components: {
    UsersList
  }
}
</script>

<style lang="scss" scoped></style>
