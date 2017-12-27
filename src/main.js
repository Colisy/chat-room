import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex/index'
import moment from 'moment'
import vuei18n from 'vue-i18n'
Vue.use(VueResource)
Vue.use(vuei18n)
Vue.config.productionTip = false
moment.locale('zh-cn')
Vue.prototype.moment=moment;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
