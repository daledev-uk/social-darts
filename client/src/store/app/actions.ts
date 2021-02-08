import { ActionTree } from 'vuex';
import { AppState } from '.';
import { UPDATE_USER_LIST } from './actionTypes';

export const actions: ActionTree<AppState, AppState> = {
    
    [UPDATE_USER_LIST]({dispatch}, update: any) {
        console.log(UPDATE_USER_LIST, update);
    }
};
