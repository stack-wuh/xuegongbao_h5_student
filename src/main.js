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

// router.beforeEach((to, from, next) => {
//   window.axois({
//     method: 'post',
//     url: '',
//   }).then(res => {
//     let code = {
//       debug: false,
//       jsApiList: [
//         'startSearchBeacons', // 开启查找周边ibeacon设备
//         'stopSearchBeacons', // 关闭查找周边ibeacon
//         'onSearchBeacons', // 监听周边ibeacon
//         'scanQRCode',  // 调用微信扫一扫
//       ]
//     }
//   })
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
