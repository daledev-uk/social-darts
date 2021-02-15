import { ActionTree } from 'vuex';
import { LobbyState } from '.';
import { AppState } from '@/store/app';
import { MEDIA_STREAM_OFFER, MEDIA_STREAM_ACCEPTED, ON_TRACK_ADDED_TO_PEER_CONNECTION } from './actionTypes';
import {peerApi} from '../../services/peerConnectionService';
import {socketApi} from '../../services/socketService';
import { SET_REMOTE_MEDIA_STREAM } from './mutationTypes';

export const actions: ActionTree<LobbyState, AppState> = {

	async [MEDIA_STREAM_OFFER](state, data: any) {
		console.log(MEDIA_STREAM_OFFER, data);
		const answer = await peerApi.setupPeerToPeerConnection(data.offer);
		socketApi.acceptMediaStreamShare(answer, data.socket);
	},

	async [MEDIA_STREAM_ACCEPTED](state, data: any) {
		console.log(MEDIA_STREAM_ACCEPTED, data);
		await peerApi.setupRemotePeerFromAnswer(data.answer);
	},

	[ON_TRACK_ADDED_TO_PEER_CONNECTION]({commit}, stream: MediaStream) {
		console.log(ON_TRACK_ADDED_TO_PEER_CONNECTION, stream);
		commit(SET_REMOTE_MEDIA_STREAM, stream);
	}
};
