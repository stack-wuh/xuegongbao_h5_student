import Vue from 'vue'
import Vuex from 'vuex'

import Index from '@/vuex/index'
Vue.use(Vuex)


import User from '@/vuex/modules/user'


export default new Vuex.Store({
  ...Index,
  modules: {
    User
  }
})
