import { GetterTree } from 'vuex';
import { AppState } from '.';

export const getters: GetterTree<AppState, AppState> = {
    onlineUsers: (state) => state.onlineUsers,
};
