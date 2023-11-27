<template>
  <div>
    <input v-model="inputValue" />
    <button @click="getUsers">Get Users</button>
    <button @click="getStatus">Get status</button>
  </div>

  <div>
    <ul>
      <li v-for="user in usersList" :key="user.id">{{ user.first_name }} {{ user.last_name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return { VkToken: '', inputValue: '', usersList: undefined }
  },
  mounted() {
    this.VkToken = localStorage.getItem('token')
  },
  methods: {
    getUsers() {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.vk.com/method/users.search?access_token=${this.VkToken}&v=5.131&q=${this.inputValue}`
        )
        .then((data) => {
          this.usersList = data.data.response
        })
        // eslint-disable-next-line no-unused-vars
        .then((data) => (this.usersList = this.usersList.items))
        .catch((err) => console.log(err))
    },
    getStatus() {
      console.log(this.usersList, this.inputValue)
    }
  }
}
</script>

<style lang="scss" scoped></style>
