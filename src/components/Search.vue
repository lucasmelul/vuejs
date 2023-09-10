<template>
  <div class="searchbar">
    <form @submit.prevent="search">
      <div class="inner-addon left-addon">
        <i class="fas fa-search px-3"></i>
        <input type="text" placeholder="Search" v-model="searchText" autocomplete="off">
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: {
  },
  data: () => {
    return {
      searchText: ''
    };
  },
  methods: {
    search() {
      if(this.searchText !== '')
        this.$emit('search', this.searchText)
    }
  }
};
</script>
<style scoped>
  .searchbar {
      position: relative;
      width: 100%;
      max-width: 510px;
      padding-bottom: 20px;
  }
  input {
    display: flex;
    align-items: center;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 10px 40px 10px 10px;
    width: 100%;
    font-size: 1rem;
    box-shadow: 0 5px 10px rgba(0,0,0,.2),
                0 0px 0px rgba(0,0,0,.2);
  }
  
  i {
    position: absolute;
    font-size: 1.25rem;
    color: #bfbfbf;
    cursor: pointer;
  }

  .inner-addon { 
    position: relative; 
    display: flex;
    align-items: center;
    
  }

  .inner-addon .fas {
    position: absolute;
    pointer-events: none;
  }

  .left-addon .fas  { left:  0px;}
  .right-addon .fas { right: 0px;}

  .left-addon input  { padding-left:  45px; }
  .right-addon input { padding-right: 30px; }

  input::placeholder {
    opacity: 0.5;
  }
</style>
