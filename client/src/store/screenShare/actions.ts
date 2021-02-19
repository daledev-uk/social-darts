import { ActionTree } from 'vuex';
import { P2PConnection, ScreenShareState } from '.';
import { AppState } from '@/store/app';
import { MEDIA_STREAM_OFFER, MEDIA_STREAM_ACCEPTED, ON_TRACK_ADDED_TO_PEER_CONNECTION, GET_VIDEO_SOURCE_INITIATE_URL, CREATE_NEW_P2P_CONNECTION, P2P_CONNECTION_TRACK_RECIEVED } from './actionTypes';
import { peerApi } from '../../services/peerConnectionService';
import { socketApi } from '../../services/socketService';
import { SET_REMOTE_MEDIA_STREAM } from './mutationTypes';
import { v4 as uuidv4 } from 'uuid';

export const actions: ActionTree<ScreenShareState, AppState> = {

	async [CREATE_NEW_P2P_CONNECTION]({ commit, dispatch }) {
		const connection = peerApi.createNewConnection();
		const connectionId = uuidv4();		
		const offer = await peerApi.createOfferOfConnection(connection);

		const p2pConnection: P2PConnection = {
			id: connectionId,
			connection,
			offer
		}
		connection.ontrack = ({ streams: [stream] }) => dispatch(P2P_CONNECTION_TRACK_RECIEVED, { p2pConnection, stream });

		return p2pConnection;
	},

	[P2P_CONNECTION_TRACK_RECIEVED]({ commit }, { p2pConnection, stream }) {
		console.log(P2P_CONNECTION_TRACK_RECIEVED, p2pConnection, stream);
	},

	[GET_VIDEO_SOURCE_INITIATE_URL]({ rootState }) {
		const appState = (rootState as any).app as AppState;
		return `${process.env.VUE_APP_CLIENT_HOST}/video-source/${appState.loggedOnUser.socketId}`;
	},

	async [MEDIA_STREAM_OFFER](state, data: any) {
		console.log(MEDIA_STREAM_OFFER, data);
		const answer = await peerApi.setupPeerToPeerConnection(data.offer);
		socketApi.acceptMediaStreamShare(answer, data.socket);
	},

	async [MEDIA_STREAM_OFFER](state, data: any) {
		console.log(MEDIA_STREAM_OFFER, data);
		const answer = await peerApi.setupPeerToPeerConnection(data.offer);
		socketApi.acceptMediaStreamShare(answer, data.socket);
	},

	async [MEDIA_STREAM_ACCEPTED](state, data: any) {
		console.log(MEDIA_STREAM_ACCEPTED, data);
		await peerApi.setupRemotePeerFromAnswer(data.answer);
	},

	[ON_TRACK_ADDED_TO_PEER_CONNECTION]({ commit }, stream: MediaStream) {
		console.log(ON_TRACK_ADDED_TO_PEER_CONNECTION, stream);
		commit(SET_REMOTE_MEDIA_STREAM, stream);
	}
};
