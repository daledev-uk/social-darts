import Vue from 'vue';
import Router, { Route } from 'vue-router';

import Login from '@/features/login/views/Login.vue';
import Lobby from '@/features/lobby/views/Lobby.vue';
import VideoSource from '@/features/videoSource/views/VideoSource.vue';
import { loginApi } from './services/api/loginApi';
import { authentication } from './security/authentication';
import { AuthenticatedUserViewModel } from './models/authenticatedUserViewModel';

Vue.use(Router);

const publicPages = ['/login', '/login/callback', '/video-source/*'];

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
			path: '/logout',
			name: 'logut'
		},
		{
			path: '/',
			name: 'lobby',
			component: Lobby
		},
		{
			path: '/video-source/:videoSourceId',
			name: 'videoSource',
			props: true,
			component: VideoSource
		}
	]
});



router.beforeEach(async (to: Route, from: Route, next: (target?: string) => void) => {
	const authRequired = !publicPages.includes(to.path) && !to.path.startsWith('/video-source/');
	const authToken = authentication.getJwtToken();

    if (authRequired && !authToken) {
		return next('/login');
	}

	if (to.path.startsWith('/login')) {
		if (!authToken) {
			return await handleLogin(to, from, next);
		}
		return next('/');
	}

	if (to.path.startsWith('/logout')) {
		authentication.clearUser();
		return next('/login');
	}

	next();
});

async function handleLogin(to: Route, from: Route, next: (target?: string) => void) {
	if (to.path === '/login/callback') {
		const code = String(to.query.code);
		const loginResult: AuthenticatedUserViewModel = await loginApi.loginCallback(code);
		if (loginResult.success) {
			authentication.setUser(loginResult);
			return next('/');
		} else {
			authentication.clearUser();
			return next('/login');
		}
	}

	return next();
}


export default router;
