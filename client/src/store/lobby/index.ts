import { Module } from 'vuex';
import { AppState } from '@/store/app';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export interface LobbyState {
	users: string[];
}

export const appUserState: LobbyState = {
	users: [],
};

export const lobby: Module<LobbyState, AppState> = {
	namespaced: false,
	state: appUserState,
	getters,
	actions,
	mutations
};
