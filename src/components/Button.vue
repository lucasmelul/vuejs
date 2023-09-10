<template>
  <button 
    role="button"
    :class="`btn rounded-pill px-4 py-2 w-100 mx-3 ${active ? 'active' : ''}`"
    :style="`--bs-btn-bg: ${bgColor}; --bs-btn-color: white; --bs-btn-active-color: white; --bs-btn-active-bg: ${bgColor};` "
    aria-pressed="true"
    @click="click"
  >
    <i v-if="icon" :class="`icon px-2 fas ${icon}`" :style="`color: white;`"></i>
    {{text}}</button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: null
    }
  },
  computed: {
    bgColor() {
      return this.active ? '#f22538' : '#bfbfbf'
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
  .icon {
    font-size: 20px;
    padding-right: 5;
  }
</style>