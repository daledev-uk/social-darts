import { userApi } from '@/services/api/userApiClient';
import { ActionTree } from 'vuex';
import { AppState } from '.';
import { LOAD_CONNECTED_USER } from './actionTypes';
import { SET_LOGGED_ON_USER, SET_ONLINE_USERS } from './mutationTypes';

export const actions: ActionTree<AppState, AppState> = {
    async [LOAD_CONNECTED_USER]({ commit }, socketId: string) {
        const response = await userApi.registerLoggedOnUser(socketId);
        commit(SET_LOGGED_ON_USER, response.registeredUser);
        commit(SET_ONLINE_USERS, response.onlineUsers);
    },
};
