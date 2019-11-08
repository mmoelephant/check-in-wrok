import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './registerServiceWorker'
import './styles/base.stylus'
import 'lib-flexible/flexible'
import api from './api/api'
import md5 from 'js-md5'
import fastclick from 'fastclick'
import 'vant/lib/index.css'
// import { Checkbox, CheckboxGroup } from 'vant'
import { RadioGroup, Radio } from 'vant'
import { Icon } from 'vant'
import { Field } from 'vant'
import { DatetimePicker } from 'vant'
import { Popup } from 'vant'
import { Toast } from 'vant'
import { Loading } from 'vant'
import { Overlay } from 'vant'
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Popup)
Vue.use(DatetimePicker)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Icon)

fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$md5 = md5

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
