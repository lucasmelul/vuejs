<template>
  <div class="container d-flex flex-column align-items-center justify-content-evenly p-5 h-100">
    <img
      alt="Vue logo"
      src="../assets/logo-welcome.png"
      width="300px"
    >
    <div class="mt-5 d-flex flex-column align-items-center">
      <h1 class="text-center mb-4">Welcome to Pokédex</h1>
      <p class="text-center">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
      <div class="w-75 my-5 d-flex justify-content-center">
        <Button :text="'Get started'" @click="close"/>
      </div>
    </div>
  </div>
</template>
<script>
  import Button from './Button.vue'
  export default {
    data: () => {
      return {
        isOpen: true
      };
    },
    components: {
      Button
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  };
</script>