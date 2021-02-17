import { userApi } from '@/services/api/userApiClient';
import { ActionTree } from 'vuex';
import { AppState } from '.';
import { LOAD_CONNECTED_USER } from './actionTypes';
import { SET_LOGGED_ON_USER, SET_ONLINE_USERS } from './mutationTypes';

export const actions: ActionTree<AppState, AppState> = {
    SOCKET_CONNECT({dispatch}, socket: any) {
        console.log('SOCKET_CONNECT', socket);
        dispatch(LOAD_CONNECTED_USER, socket.id);
    },

    SOCKET_DISCONNECT(state, data: any) {
        console.log('SOCKET_DISCONNECT', data);
    },

    async [LOAD_CONNECTED_USER]({ commit }, socketId: string) {
        console.log('LOAD_CONNECTED_USER', socketId);
        const response = await userApi.registerLoggedOnUser(socketId);
        commit(SET_LOGGED_ON_USER, response.registeredUser);
        commit(SET_ONLINE_USERS, response.onlineUsers);
    },
};
