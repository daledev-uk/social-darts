import { GetterTree } from 'vuex';
import { LobbyState } from '.';
import { AppState } from '@/store/app';

export const getters: GetterTree<LobbyState, AppState> = {
	users: (state) => state.users,
	remoteMediaStream: (state) => state.remoteMediaStream
};