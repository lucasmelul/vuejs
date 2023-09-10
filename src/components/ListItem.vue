<template>
  <li class="item py-4 px-4 m-2 d-flex align-items-center justify-content-between rounded-3 bg-white"
    @click="setPokemonUrl">
      <span class="h5 mb-0">{{ item.name }}</span>
      <FavoriteIcon :active="isFavorite" @click="toggleFavorite"/>
  </li>
</template>
<script>
import { mapState } from 'vuex'
import FavoriteIcon from './FavoriteIcon.vue'

export default {
  props: ['item'],
  components: {
    FavoriteIcon,
  },
  computed:{
    ...mapState(['favoritesList']),
    isFavorite() {
      return !!this.favoritesList.find(fav => Number(fav.id) === this.item.id)
    }
  },
  data: () => {
    return {
      searchText: '',
    };
  },
  methods: {
    setPokemonUrl() {
      this.$emit('setPokemonUrl', this.item.url)
    },
    toggleFavorite() {
      const itemIndex = this.favoritesList.findIndex(fav => Number(fav.id) === this.item.id)
      if(itemIndex !== -1) {
        this.$store.commit("DELETE_FAVORITE", itemIndex);
      } else {
        this.$store.commit("ADD_FAVORITE", this.item);
      }
      this.$emit('update')
    }
  }
};
</script>
<style scoped>
  .item {
    height: 60px;
    background-color: #efefef;
    text-align: center;
    text-transform: capitalize;
    border-radius: 3px;
    cursor: pointer;     
  }
</style>