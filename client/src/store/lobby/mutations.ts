import { MutationTree } from 'vuex';
import { LobbyState } from '.';
import { SET_REMOTE_MEDIA_STREAM, UPDATE_USER_LIST } from './mutationTypes';

export const mutations: MutationTree<LobbyState> = {
    
    [UPDATE_USER_LIST](state, updateUserListPayload: any) {
        console.log(UPDATE_USER_LIST, updateUserListPayload);
        state.users.push(...updateUserListPayload.users);
    },

    [SET_REMOTE_MEDIA_STREAM](state, stream: MediaStream) {
        console.log(SET_REMOTE_MEDIA_STREAM, stream);
        state.remoteMediaStream = stream;
    }
};
