import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import {store} from './store';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

const sockerServerUrl = process.env.VUE_APP_API_HOST as string;

Vue.use(new VueSocketIO({
	connection: sockerServerUrl,
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		mutationPrefix: 'SOCKET_',
	},
}));

const vueInstnace = new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app');
