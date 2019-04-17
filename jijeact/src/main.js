import Vue from 'vue'
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import VueFullPage from 'vue-fullpage.js'
import App from './App'

Vue.use(VueFullPage);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
