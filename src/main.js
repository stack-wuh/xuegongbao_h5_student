import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vant from '@/utils/vant'
import {
  _toast
} from '@/utils/global'

Vue.config.productionTip = false
window.$router = router

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
