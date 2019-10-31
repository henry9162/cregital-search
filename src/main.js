import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
axios.defaults.headers["Authorization"] = "563492ad6f917000010000014c75f59326e144c98c806d9844df3bde";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
