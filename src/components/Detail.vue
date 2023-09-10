<template>
  <div class="detail">
    <div class="detail-view card position-relative">
      <div class="position-absolute top-0 end-0 m-3">
        <i @click="closeDetail" class="fas fa-times-circle"></i>
      </div>
      <div v-if="pokemon" class="data-container">
        <div class="image">
          <img :src="pokemon.sprites.other.home.front_default" class="w-100 h-auto" alt="">
        </div>
        <div class="px-3 py-2">
          <div class="card-body pt-0" >
            <div class="item">
              <div class="item-label">Name: </div>
              <div class="text-capitalize">{{pokemon.name }}</div>
            </div>
            <div class="item">
              <div class="item-label">Weight: </div>
              <div class="text-capitalize">{{pokemon.weight}}</div>
            </div>
            <div class="item">
              <div class="item-label">Height: </div>
              <div class="text-capitalize">{{pokemon.height}}</div>
            </div>
            <div class="item">
              <div class="item-label">Types: </div>
              <div class="text-capitalize">{{getTypes}}</div>
            </div>
          </div>
          <div class="card-actions d-flex justify-content-between my-2 mx-3">
            <Button :text="'Share to my friends'" @click="copyToClipboard"/>
            <FavoriteIcon :active="isFavorite" @click="toggleFavorite"/>
          </div>
        </div>
      </div>
      <div v-if="isError" class="card-body error-container">
        <h3>Uh-oh!</h3>
        <p>You look lost on your journey!</p>
        <div class="card-actions d-flex justify-content-between my-2 mx-3">
          <Button :text="'Go back home'" @click="closeDetail"/>
        </div>
      </div>
      <loader v-if="!pokemon && !isError" />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Button from './Button.vue'
  import FavoriteIcon from './FavoriteIcon.vue'
  import Loader from './Loader.vue'

  export default {
    components: {
      Button,
      FavoriteIcon,
      Loader
    },
    props: [
      'pokemonUrl',
    ],
    data: () => {
      return {
        show: false,
        pokemon: null,
        isError: false
      }      
    },
    computed: {
      ...mapState(['favoritesList']),
      getTypes() {
        return this.pokemon.types.map(type => type.type.name).join(', ')
      },
      isFavorite() {
        return !!this.favoritesList.find(fav => Number(fav.id) === this.pokemon.id)
      }
    },
    methods: {
      fetchData() {
        let req = new Request(this.pokemonUrl);
        fetch(req)
          .then((resp) => {
            if(resp.status === 200) {
              return resp.json();
            } else {
              this.isError = true
            }
          })
          .then((data) => {
            if(data) {
              this.pokemon = data;
            }
          })
          .catch((error) => {
            console.log(error);
            this.isError = true
          })
      },
      closeDetail() {
        this.$emit('closeDetail');
      },
      toggleFavorite() {
        const itemIndex = this.favoritesList.findIndex(fav => Number(fav.id) === this.pokemon.id)
        if(itemIndex !== -1) {
          this.$store.commit("DELETE_FAVORITE", itemIndex);
        } else {
          this.$store.commit("ADD_FAVORITE", {
            id: this.pokemon.id,
            name: this.pokemon.name,
            url: this.pokemonUrl
          });
        }
      },
      copyToClipboard() {
        navigator.clipboard.writeText(this.pokemon.name);
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>

<style scoped>
  .detail {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    padding: 90px 10px 10px;
    width: calc(100% - 20px);
    height: calc(100vh - 20px);
    width: 100%;
    height: 100vh;
    background: rgba(10, 7, 0, 0.562);
  }

  .detail-view {
    width: 90%;
    position: relative;
    min-height: 200px;
    max-width: 510px;
    
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 15px 30px rgba(0,0,0,.2),
                0 10px 10px rgba(0,0,0,.2);
  }

  .data-container {
    min-height: 680px;
  }

  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/bg-item.png');
    background-size: cover;
    min-height: 350px;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 400px;
    border-bottom: 1px solid #ccc;
    height: 50px;
    font-size: 18px;
  }

  .item-label {
    font-weight: 400;
    margin-right: 5px;
  }
  
  i {
    font-size: 2rem;
    color: #efefef;
  }
</style>
