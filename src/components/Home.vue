<template>
  <div class="d-flex flex-column align-items-center p-3 w-100 h-100">
    <list v-if="!isFavoriteList" @setPokemonUrl="openDetail"/>
		<favorite-list v-if="isFavoriteList" @setPokemonUrl="openDetail"/>
		<detail
			v-if="showDetail"
      :pokemonUrl="pokemonUrl"
      @closeDetail="closeDetail"/>
		<div class="buttons-container fixed-bottom d-flex justify-content-evenly align-items-center bg-white">
			<Button :text="'All'" :icon="'fa-list'" :active="!isFavoriteList" @click="showFavoriteList(false)"/>
			<Button :text="'Favorites'" :icon="'fa-star'" :active="isFavoriteList" @click="showFavoriteList(true)"/>
		</div>
  </div>
</template>
<script>
	import List from './List.vue'
	import Detail from './Detail.vue'
	import Button from './Button.vue'
	import FavoriteList from './FavoriteList.vue'

  export default {
    data: () => {
      return {
        pokemons: [],
        searchText: null,
				pokemonUrl: "",
      	showDetail: false,
				isFavoriteList: false
      };
    },
    components: {
			List,
			Detail,
			Button,
			FavoriteList
    },
    methods: {
			openDetail(url) {
				this.pokemonUrl = url;
				this.showDetail = true;
			},
			closeDetail() {
				this.pokemonUrl = "";
				this.showDetail = false;
			},
			showFavoriteList(show) {
				this.isFavoriteList = show
			}
    },
  };
</script>
<style scoped>
	.buttons-container {
		height: 80px;
		box-shadow: 0 10px 25px rgba(0,0,0,.2), 
			0 25px 50px rgba(0,0,0,.2)
	}
</style>