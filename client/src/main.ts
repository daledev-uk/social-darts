import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import {store} from './store';
import VueSocketIO from 'vue-socket.io';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './main.scss';

const API_SERVER_URL = process.env.VUE_APP_ROOT_API ? process.env.VUE_APP_ROOT_API : 'http://localhost:5000';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(new VueSocketIO({
    connection: API_SERVER_URL,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_',
    },
}));

const vueInstnace = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');