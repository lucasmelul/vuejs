<template>
  <div class="d-flex flex-column align-items-center w-100 h-100">
    <Search @search="search"/>
    <ul class="w-100 p-0">
      <ListItem v-for="pokemon in pokemons" :key="pokemon.id" :item="pokemon" @setPokemonUrl="setPokemonUrl(pokemon.url)"/>
    </ul>
    <div id="scroll-trigger" ref="infinitescrolltrigger">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <loader v-if="isLoading"/>
  </div>
</template>
<script>
  import Search from './Search.vue'
  import ListItem from './ListItem.vue'
  import { apiUrl } from '../config'
  import Loader from './Loader.vue';

  export default {
    data: () => {
      return {
        pokemons: [],
        nextUrl: '',
        currentUrl: '',
        searchText: null,
        isLoading: false
      };
    },
    components: {
      Search,
      ListItem,
      Loader
    },
    methods: {
      search(searchText) {
        this.$emit('setPokemonUrl', `${apiUrl}${searchText}`);
      },
      fetchData() {
        this.isLoading = true
        fetch(this.currentUrl)
          .then((resp) => {
            if(resp.status === 200)
              return resp.json();
          })
          .then((data) => {
            this.nextUrl = data.next;
            data.results.forEach(pokemon => {
              pokemon.id = Number(pokemon.url.split('/')
                .filter(function(part) { return !!part }).pop());
              this.pokemons.push(pokemon);
            });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => this.isLoading = false)
      },
      scrollTrigger() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if(entry.intersectionRatio > 0 && this.nextUrl) {
              this.next();
            }
          });
        });
        observer.observe(this.$refs.infinitescrolltrigger);
      },
      next() {
        this.currentUrl = this.nextUrl;
        this.fetchData();
      },
      setPokemonUrl(url) {
        this.$emit('setPokemonUrl', url);
      }
    },
    created() {
      this.currentUrl = apiUrl;
      this.fetchData();
    },
    mounted () {
      this.scrollTrigger();
    },
  };
</script>
<style scoped>
  #scroll-trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    font-size: 2rem;
    color: #efefef;
  }
</style>