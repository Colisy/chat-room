import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state={
  name:"珊珊",
  oContent:""
}

const store=new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store





//
