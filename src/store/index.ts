import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tierSelected:"tier3"
  },
  mutations: {
    changeTier(state,newTier){
      state.tierSelected = newTier
    }
  },
  actions: {
  },
  modules: {
  }
})
