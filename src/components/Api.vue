<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <button @click="openAuthorizationUrl">TOKEN</button>
  </div>
</template>

<script>
export default {
  methods: {
    openAuthorizationUrl() {
      const url = new URL('https://oauth.vk.com/authorize');
      url.searchParams.set('client_id', '51802731');
      url.searchParams.set('redirect_uri', 'https://oauth.vk.com/blank.html');
      url.searchParams.set('display', 'mobile');
      url.searchParams.set('scope', 'offline,friends');
      url.searchParams.set('response_type', 'token');
      url.searchParams.set('v', '5.131');

      const newWindow = window.open(url.toString(), '_blank');

      // Wait for the user to authorize and close the new window
      const intervalId = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(intervalId);
          
          // Retrieve parameters from the new window's URL
          console.log(newWindow);
          const params = newWindow.location.href;
          const accessToken = params.get('access_token');
          const expiresIn = params.get('expires_in');
          
          if (accessToken && expiresIn) {
            // Use the access token and expiration data as needed
            console.log("Access Token:", accessToken);
            console.log("Expires In:", expiresIn);
          }
        }
      }, 500);
    }
  }
}
</script>

<style lang="scss" scoped></style>