import Vue from 'vue';
import App from './App.vue';
import router, {registerRouterHooks} from './router';
import {store} from './store';
import VueSocketIO from 'vue-socket.io';

const API_SERVER_URL = process.env.VUE_APP_ROOT_API ? process.env.VUE_APP_ROOT_API : 'http://localhost:5000';

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
    connection: API_SERVER_URL,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_',
    },
}));

// only enforce authentication once we know
// the auth service has been initialised
registerRouterHooks();

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
