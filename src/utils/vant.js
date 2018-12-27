import Vue from 'vue'
import $http from '@/utils/axios'

import 'vant/lib/index.css'
import '@/assets/style/base.less'
import '@/assets/style/color.less'
import '@/assets/style/elem.less'
import {
  _toast, setStorageHandle, getStorageHandle
} from '@/utils/global'

import {
  Button,
  Checkbox,
  Toast,
  Field,
  Cell,
  CellGroup,
  NoticeBar,
  Dialog,
  CheckboxGroup,
  NumberKeyboard,
  Tabbar,
  TabbarItem,
  Popup,
  Picker,
  List,
  DatetimePicker,
  Icon,
  Uploader,
  Switch,
  Tab,
  Tabs,
  Progress,
  RadioGroup,
  Radio,
} from 'vant'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Toast)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(NoticeBar)
Vue.use(Dialog)
Vue.use(CheckboxGroup)
Vue.use(NumberKeyboard)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(List)
Vue.use(DatetimePicker )
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Switch)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Progress)
Vue.use(RadioGroup)
Vue.use(Radio)

window.$http = $http

Vue.prototype.$http = $http
Vue.prototype.$toast = _toast
Vue.prototype.$dialog = Dialog
window.$toast = Toast

Vue.prototype._setItem = setStorageHandle
Vue.prototype._getItem = getStorageHandle


window.rootPath = '/api'

window.$bus = new Vue()
