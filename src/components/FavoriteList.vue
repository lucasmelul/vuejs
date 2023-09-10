<template>
  <div class="d-flex flex-column align-items-center w-100 h-100">
    <Search @search="search"/>
    <ul class="w-100 p-0">
      <ListItem v-for="pokemon in pokemons" 
        :key="pokemon.id" 
        :item="pokemon" 
        @setPokemonUrl="setPokemonUrl(pokemon.url)" 
        @update="fetchData"
      />
    </ul>
    <div v-if="!pokemons.length" class="card-body error-container">
      <h3>Uh-oh!</h3>
      <p>You look lost on your journey!</p>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import Search from './Search.vue'
  import ListItem from './ListItem.vue'

  export default {
    data: () => {
      return {
        pokemons: [],
        searchText: null,
      };
    },
    components: {
      Search,
      ListItem,
    },
    computed:{
        ...mapState(['favoritesList'])
    },
    methods: {
      search(searchText) {
        this.pokemons = this.favoritesList
          .filter(pokemon => pokemon.name.includes(searchText))
      },
      fetchData() {
        this.pokemons = [...this.favoritesList]
      },
      setPokemonUrl(url) {
        this.$emit('setPokemonUrl', url);
      }
    },
    created() {
      this.fetchData();
    },
  };
</script>
<style scoped>
</style>