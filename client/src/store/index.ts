import Vue from 'vue';
import Vuex from 'vuex';
import { app } from './app';
import { lobby } from './screenShare';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		app,
		lobby
	}
});
