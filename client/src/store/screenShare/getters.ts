import { GetterTree } from 'vuex';
import { ScreenShareState } from '.';
import { AppState } from '@/store/app';

export const getters: GetterTree<ScreenShareState, AppState> = {
	connections: (state) => state.connections,
	users: (state) => state.users,
	remoteMediaStream: (state) => state.remoteMediaStream
};
