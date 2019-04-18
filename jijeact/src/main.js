import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        imgPath: '',//target img src
        url: '', //target url
    },
});

new Vue({
    render: h => h(App),
    store
}).$mount('#app')
