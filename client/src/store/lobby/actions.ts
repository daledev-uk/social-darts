import { ActionTree } from 'vuex';
import { LobbyState } from '.';
import { AppState } from '@/store/app';
import { MEDIA_STREAM_OFFER } from './actionTypes';

export const actions: ActionTree<LobbyState, AppState> = {
    [MEDIA_STREAM_OFFER](state, initiationRequest: any) {
        console.log(MEDIA_STREAM_OFFER, initiationRequest);
    }
};