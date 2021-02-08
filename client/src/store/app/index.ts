import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export interface AppState {
	socketId: string;
}

// initial state
export const appState: AppState = {
	socketId: ''
};

export const app: Module<AppState, AppState> = {
	namespaced: false,
	state: appState,
	getters,
	actions,
	mutations
};
