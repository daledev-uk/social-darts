import { MutationTree } from 'vuex';
import { LobbyState } from '.';
import { UPDATE_USER_LIST } from './mutationTypes';

export const mutations: MutationTree<LobbyState> = {
    [UPDATE_USER_LIST](state, updateUserListPayload: any) {
        console.log(UPDATE_USER_LIST, updateUserListPayload);
        state.users.push(...updateUserListPayload.users);
    }
};
