import { MutationTree } from 'vuex';
import { AppState } from '.';
import { OnlineUser } from '../../../../server/src/viewModels/onlineUser';
import { SET_LOGGED_ON_USER, SET_ONLINE_USERS, NEW_USER_ONLINE } from './mutationTypes';

export const mutations: MutationTree<AppState> = {
	[SET_LOGGED_ON_USER](state, user: OnlineUser) {
		state.loggedOnUser = user;
	},

    [SET_ONLINE_USERS](state, users: OnlineUser[]) {
		state.onlineUsers = users;
	},

    [NEW_USER_ONLINE](state, user: OnlineUser) {
		state.onlineUsers.push(user);
	},
};
