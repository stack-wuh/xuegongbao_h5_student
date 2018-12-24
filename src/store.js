import Vue from 'vue'
import Vuex from 'vuex'

import Index from '@/vuex/index'
Vue.use(Vuex)


import User from '@/vuex/modules/user'
import Common from '@/vuex/common'
import Study from '@/vuex/modules/study'
import Job from '@/vuex/modules/job'
import Life from '@/vuex/modules/life'

export default new Vuex.Store({
  ...Index,
  modules: {
    User,
    Common,
    Study,
    Job,
    Life
  }
})
