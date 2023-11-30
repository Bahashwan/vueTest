<script setup>
import VkAuth from './components/VkAuth.vue'
import Redirect from './components/Redirect.vue'
import VkSearchInput from './components/VkSearchInput.vue'
import FriendsList from './components/FriendsList.vue';
</script>

<template>
  <main>
    <VkAuth />
    <Redirect />
    <VkSearchInput />
    <FriendsList />

  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
