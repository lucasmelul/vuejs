<template>
  <div class="loader-container w-100 position-absolute bg-white d-flex justify-content-center align-items-center top-0">
    <img class="loader" src="../assets/loader.png" alt="">
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
  .loader-container {
    height: 100vh;
    z-index: 9999;
  }

  .loader {
    width: 110px;
    height: 100px;
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }

  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
  }
</style>