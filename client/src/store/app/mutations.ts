import { MutationTree } from 'vuex';
import { AppState } from '.';
import { OnlineUser } from '../../../../server/src/viewModels/onlineUser';
import { SET_LOGGED_ON_USER, SET_ONLINE_USERS, NEW_USER_ONLINE, SET_SOCKET_ID } from './mutationTypes';

export const mutations: MutationTree<AppState> = {
	[SET_LOGGED_ON_USER](state, user: OnlineUser) {
		state.loggedOnUser = user;
	},

	[SET_SOCKET_ID](state, socketId: string) {
		if (state.loggedOnUser) {
			state.loggedOnUser.socketId = socketId;
		};
	},

    [SET_ONLINE_USERS](state, users: OnlineUser[]) {
		state.onlineUsers = users;
	},

    [NEW_USER_ONLINE](state, user: OnlineUser) {
		state.onlineUsers.push(user);
	},
};
