<template>
  <div>
    <div class="usersList">
      <div class="userItem" v-for="user in usersListWithPhoto" v-bind:key="user.id">
        <div>
          <img class="userImg" :src="user.url" />
        </div>
        <div class="name">
          <span>{{ user.first_name }} {{ user.last_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    usersList: Array
  },

  data() {
    return {
      usersListWithPhoto: [],
      usersPohotos: []
    }
  },
  methods: {
    async getUserPhoto(userId) {
      let config = {
        method: 'get',
        url: '/api.vk.com/method/photos.getProfile',
        params: {
          access_token: localStorage.getItem('token'),
          v: '5.131',
          user_id: userId
        }
      }

    

      try {
        const response = await axios.request(config)
        if (
          response.data &&
          response.data.response &&
          response.data.response.items &&
          response.data.response.items.length > 0
        ) {
          const url = response.data.response.items[0].sizes[1].url
          return url
        } else {
          return 'https://adamsedu.net/web/image/744/kisspng-logo-person-user-person-icon-5b4d2bd25185e8.0544055615317841463339.png'
        }
      } catch (error) {
        console.log(error)
      }
    },

    async fetchUserPhotos() {
      for (const user of this.usersList) {
        const url = await this.getUserPhoto(user.id)
        if (url) {
          this.usersPohotos.push({ user_id: user.id, url: url })
        }
      }
    },
    combineArrays(array1, array2) {
      const combinedArray = []

      for (const obj1 of array1) {
        const matchingObj = array2.find((obj2) => obj2.user_id === obj1.id)

        if (matchingObj) {
          const combinedObj = {
            ...obj1,
            ...matchingObj
          }

          combinedArray.push(combinedObj)
        }
      }

      return combinedArray
    }
  },
  watch: {
    usersList: {
      // eslint-disable-next-line no-unused-vars
      handler(newUserList) {
        this.fetchUserPhotos()
      },
      deep: true
    },
    usersPohotos: {
      // eslint-disable-next-line no-unused-vars
      handler(newlist) {
        this.usersListWithPhoto = this.combineArrays(this.usersList, this.usersPohotos)
      },
      deep: true
    },
    usersListWithPhoto: {
      handler(newlist) {
        console.log(newlist)
        if (newlist.length == this.usersList.length) {
          alert('done')
        }
      },
      deep: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.usersList {
  display: flex;
  flex-direction: column;

  max-width: 300px;
  max-height: 200px;
  overflow: auto;
  background-color: white;
  color: black;
  .userItem {
    text-align: center;
     display: flex;
    // gap: 30px;
    justify-content: space-around;
    justify-items: center;
    .name{
        margin: auto;
        width: 60%;
    }
    img {
      width: 70px;
      height: 100px;
      padding-bottom: -10px;
    }
  }
  .userItem:hover{
    background-color: rgb(90, 90, 201);
   
    
    .name{
        color: white;
    }
  }
}
</style>
