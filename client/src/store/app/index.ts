import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { OnlineUser } from '../../../../server/src/viewModels/onlineUser';

export interface AppState {
	loggedOnUser: OnlineUser;
	onlineUsers: OnlineUser[]
}

// initial state
export const appState: AppState = {
	loggedOnUser: {} as OnlineUser,
	onlineUsers: []
};

export const app: Module<AppState, AppState> = {
	namespaced: false,
	state: appState,
	getters,
	actions,
	mutations
};
