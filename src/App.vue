<template>
  <div id="app">
    <welcome v-if="showSplash" @close="closeSplash"/>
    <home v-else/>
    <loader v-if="isLoading"/>
  </div>
</template>

<script>
import Welcome from "./components/Welcome.vue";
import Home from "./components/Home.vue";
import Loader from "./components/Loader.vue";

export default {
  name: "app",
  components: {
    Welcome,
    Home,
    Loader
  },
  data: () => {
    return {
      showSplash: true,
      isLoading: false
    }
  },
  methods: {
    closeSplash() {
      this.isLoading = true;
      this.showSplash = false
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  }
};
</script>

<style>
@import url("https://use.fontawesome.com/releases/v5.8.2/css/all.css");
@import url("https://unpkg.com/bootstrap/dist/css/bootstrap.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/solid.min.css");

body {
  margin: 0;
  padding: 0;
  background: #f9f9f9;
}

#app {
    height: 100vh;
}
</style>
