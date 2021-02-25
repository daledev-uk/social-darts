import { ActionTree } from 'vuex';
import { P2PConnection, ScreenShareState } from '.';
import { AppState } from '@/store/app';
import { 
	MEDIA_STREAM_OFFER, 
	MEDIA_STREAM_ACCEPTED, 
	ON_TRACK_ADDED_TO_PEER_CONNECTION, 
	CREATE_NEW_P2P_CONNECTION, 
	VIDEO_SOURCE_CONFIRMED
} from './actionTypes';
import { peerApi } from '../../services/peerConnectionService';
import { socketApi } from '../../services/socketService';
import { ADD_P2P_CONNECTION, SET_P2P_RECIEVED, SET_REMOTE_MEDIA_STREAM, ADD_TRACK_TO_P2P_CONNECTION } from './mutationTypes';
import { v4 as uuidv4 } from 'uuid';

export const actions: ActionTree<ScreenShareState, AppState> = {

	async [CREATE_NEW_P2P_CONNECTION]({ commit }) {
		const connection = peerApi.createNewConnection();
		const connectionId = uuidv4();		
		const offer = await peerApi.createOfferOfConnection(connection);

		const p2pConnection: P2PConnection = {
			id: connectionId,
			connection,
			offer,
			receivedResponse: false,
            streams: []
		}
		connection.ontrack = ({ streams: [stream] }) => commit(ADD_TRACK_TO_P2P_CONNECTION, { connectionId, stream });
		commit(ADD_P2P_CONNECTION, p2pConnection);
		return p2pConnection;
	},

	async [MEDIA_STREAM_OFFER](state, data: any) {
		const answer = await peerApi.setupPeerToPeerConnection(data.offer);
		socketApi.acceptMediaStreamShare(answer, data.socket);
	},

	async [MEDIA_STREAM_OFFER](state, data: any) {
		const answer = await peerApi.setupPeerToPeerConnection(data.offer);
		socketApi.acceptMediaStreamShare(answer, data.socket);
	},

	async [MEDIA_STREAM_ACCEPTED](state, data: any) {
		await peerApi.setupRemotePeerFromAnswer(data.answer);
	},

    [VIDEO_SOURCE_CONFIRMED]({ commit }, data: any) {
		commit(SET_P2P_RECIEVED, data.videoSourceId);
    },

	[ON_TRACK_ADDED_TO_PEER_CONNECTION]({ commit }, stream: MediaStream) {
		commit(SET_REMOTE_MEDIA_STREAM, stream);
	}
};
