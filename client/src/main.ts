import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import {store} from './store';
import VueSocketIO from 'vue-socket.io';
import axios from 'axios';
import { authentication } from './security/authentication';

Vue.config.productionTip = false;

axios.interceptors.request.use(function(config) {
    const token = authentication.getJwtToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

if (authentication.isAuthenticated() || window.location.pathname.startsWith('/video-source/')) {
	const sockerServerUrl = process.env.VUE_APP_API_HOST as string;
	const socketInstance = new VueSocketIO({
		connection: sockerServerUrl,
		vuex: {
			store,
			actionPrefix: 'SOCKET_',
			mutationPrefix: 'SOCKET_',
		},
        debug: true
        
	});
	Vue.use(socketInstance);
}

const vueInstnace = new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app');
