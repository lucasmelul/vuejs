<template>
  <div class="btn icon-circle d-flex justify-content-center align-items-center rounded-circle px-4 py-2" v-on:click.stop :style="'--bs-btn-bg: #f5f5f5'" @click="click">
    <i class="icon fas fa-star" 
      :style="`color: ${bgColor};`"></i>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    bgColor() {
      return this.active ? '#eca539' : '#bfbfbf'
    },
  },
  data: () => {
    return {
    };
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
};
</script>

<style scoped>
  .icon-circle {
    width: 50px;
    height: 50px;
  }

  .icon {
    font-size: 26px;
  }
</style>