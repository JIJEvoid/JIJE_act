import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import tools from './utils/tools'

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.prototype.$tools = tools;

const store = new Vuex.Store({
    state: {
        imgPath: '',//target img src
        imgName:'',
        url: '', //target url
        OS:'pc',//mobile
    },
});

new Vue({
    render: h => h(App),
    store
}).$mount('#app')
