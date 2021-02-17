import { MutationTree } from 'vuex';
import { AppState } from '.';
import { OnlineUser } from '../../../../server/src/viewModels/onlineUser';
import { SET_LOGGED_ON_USER, SET_ONLINE_USERS, NEW_USER_ONLINE } from './mutationTypes';

export const mutations: MutationTree<AppState> = {
	[SET_LOGGED_ON_USER](state, user: OnlineUser) {
		console.log(SET_LOGGED_ON_USER, user);
		state.loggedOnUser = user;
	},

    [SET_ONLINE_USERS](state, users: OnlineUser[]) {
		console.log(SET_ONLINE_USERS, users);
		state.onlineUsers = users;
	},

    [NEW_USER_ONLINE](state, user: OnlineUser) {
		console.log(NEW_USER_ONLINE, user);
		state.onlineUsers.push(user);
	},
};
