import Vue from 'vue';
import Router from 'vue-router';

import authService from '@/services/security/authenticationService';

import Login from '@/features/login/views/Login.vue';
import Lobby from '@/features/lobby/views/Lobby.vue';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/',
			name: 'lobby',
			component: Lobby
		}
	]
});


export function registerRouterHooks() {
	router.beforeEach((to, from, next) => {
		// if not authenticated, only allow access to registration page
		if (!authService.isAuthenticated()) {
			if (to.path.startsWith('/login')) {
				//return next();
			}

			//return next('/login');
		}


		// allow anything else
		next();
	});
}

export default router;
