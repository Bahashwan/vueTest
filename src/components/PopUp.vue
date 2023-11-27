<!-- <template>
  <div>
    <button @click="showModal = true">Open Popup</button>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <div v-html="popupContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      showModal: false,
      popupContent: ''
    }
  },
  methods: {
    fetchDataFromAPI() {
      axios
        .get(
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
        .then((response) => {
          this.popupContent = response.data
        })
    }
  }
}
</script>

<style>
/* Style the modal */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

/* Style the modal content */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* Style the close button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style> -->

<template>
    <div>
      <button @click="openPopup">Open Popup</button>
      <div><iframe  width=400 height=300 frameborder=0 scrolling=auto :srcdoc="popupContent"></iframe></div>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closePopup">&times;</span>
          <iframe :srcdoc="popupContent" ></iframe>
          
        </div>

      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        showModal: false,
        popupContent: ''
      };
    },
    methods: {
      openPopup() {
        this.fetchDataFromAPI();
        this.showModal = true;
      },
      closePopup() {
        this.showModal = false;
      },
      fetchDataFromAPI() {
        axios
          .get(
            'https://cors-anywhere.herokuapp.com/https://oauth.vk.com/authorize',
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
          .then(response => {
            this.popupContent = response.data;
            // window.open(response.data)
          })
          .catch(error => {
            console.error(error,'----');
            // Handle any errors that occur during the API request
          });
      }
    }
  };
  </script>
  
  
  <style>
  /* Style the modal */
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  /* Style the modal content */
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    height: 80%;
  }
  
  /* Style the close button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  
  iframe {
    border: none;
  }
  </style>
  