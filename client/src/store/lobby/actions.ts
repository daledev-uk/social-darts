import { ActionTree } from 'vuex';
import { LobbyState } from '.';
import { AppState } from '@/store/app';
import { CALL_INITIATION } from './actionTypes';

export const actions: ActionTree<LobbyState, AppState> = {
    [CALL_INITIATION](state, initiationRequest: any) {
        console.log(CALL_INITIATION, initiationRequest);
    }
};