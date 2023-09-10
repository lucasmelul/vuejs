import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		favoritesList: []
	},
	mutations:{
		ADD_FAVORITE: function(state, payload){
			state.favoritesList = [...state.favoritesList, payload];
		},
		DELETE_FAVORITE: function(state, payload){
			state.favoritesList.splice(payload, 1)
		},
	}
})
