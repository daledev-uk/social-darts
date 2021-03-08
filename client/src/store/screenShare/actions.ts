import { ActionTree } from 'vuex';
import { CreateP2PConnectionRequest, P2PConnection, ScreenShareState } from '.';
import { AppState } from '@/store/app';
import { 
	ON_TRACK_ADDED_TO_PEER_CONNECTION, 
	CREATE_NEW_P2P_CONNECTION,
	MAKE_P2P_OFFER, 
	RENEGOTIATE_CONNECTION,
	DELIVER_ANSWER,
	DELIVER_OFFER
} from './actionTypes';
import { peerApi } from '../../services/peerConnectionService';
import { 
	ADD_P2P_CONNECTION, 
	SET_P2P_RECIEVED, 
	SET_REMOTE_MEDIA_STREAM, 
	ADD_TRACK_TO_P2P_CONNECTION,
	UPDATE_OFFER,
	UPDATE_P2P_CONN
} from './mutationTypes';
import { v4 as uuidv4 } from 'uuid';
import { socketApi } from '@/services/socketService';

export const actions: ActionTree<ScreenShareState, AppState> = {

	async [CREATE_NEW_P2P_CONNECTION]({ commit, state }, request: CreateP2PConnectionRequest) {
		const connection = peerApi.createNewConnection();		

		const connectionId = request.p2pId ? request.p2pId : uuidv4();

		const p2pConnection: P2PConnection = {
			id: connectionId,
			localPeerType: this.state.loggedOnUser ? 'user' : 'device',
			remotePeer: request.remotePeer,
			connection,
			receivedResponse: false,
            streams: []
		}

		if (request.remotePeer && request.remotePeer.offer) {
			const answer = await peerApi.attachOfferToConnection(connection, request.remotePeer.offer);
			socketApi.confirmVideoForSource(connectionId, request.remotePeer, answer);
		}	

		connection.onnegotiationneeded = (evt) => {			
			//this.dispatch(RENEGOTIATE_CONNECTION, p2pConnection);
		};

		connection.ontrack = ({ streams: [stream] }) => {
			commit(ADD_TRACK_TO_P2P_CONNECTION, { connectionId, stream });
		};

		connection.onconnectionstatechange = (evt) => console.log('onconnectionstatechange', evt);
		connection.ondatachannel = (evt) => console.log('ondatachannel', evt);
		//connection.onicecandidate = (evt) => console.log('onicecandidate', evt);
		connection.onicecandidateerror = (evt) => console.log('onicecandidateerror', evt);
		//connection.onicegatheringstatechange = (evt) => console.log('onicegatheringstatechange', evt);
		connection.onstatsended = (evt) => console.log('onstatsended', evt);

		commit(ADD_P2P_CONNECTION, p2pConnection);
		return p2pConnection;
	},

	async [MAKE_P2P_OFFER]({ state }, p2pConnId) {
		const p2pConn = state.connections[p2pConnId];
		p2pConn.offer = await peerApi.createOfferOfConnection(p2pConn.connection); 
		socketApi.sendP2pOffer(p2pConn);
    },

	[ON_TRACK_ADDED_TO_PEER_CONNECTION]({ commit }, stream: MediaStream) {
		commit(SET_REMOTE_MEDIA_STREAM, stream);
	},

	async [RENEGOTIATE_CONNECTION]({ commit }, p2pConn: P2PConnection) {
		console.log(RENEGOTIATE_CONNECTION, p2pConn);
		const offer = await peerApi.createOfferOfConnection(p2pConn.connection);
		console.log(RENEGOTIATE_CONNECTION, 'p2p' + p2pConn.connection);

		commit(UPDATE_OFFER, { id: p2pConn.id, offer });
		socketApi.sendP2pOffer(p2pConn);
	},

	async [DELIVER_OFFER]({ dispatch, commit, state }, data: any) {
		let p2pConn = state.connections[data.p2pConnId];
		if (p2pConn.remotePeer.type === 'unknown') {
			p2pConn.remotePeer = {
				type: 'device',
				socketId: data.senderSocketId				
			};			
		}

		const answer = await peerApi.attachOfferToConnection(p2pConn.connection, data.offer);
		commit(UPDATE_P2P_CONN, p2pConn);

		socketApi.confirmVideoForSource(p2pConn.id, p2pConn.remotePeer, answer);		
	},

	async [DELIVER_ANSWER]({ state, commit }, data: any) {
		const p2pConn = state.connections[data.p2pConnId];
		await peerApi.attachAnswerToConnection(p2pConn.connection, data.answer);
		commit(SET_P2P_RECIEVED, p2pConn.id);
    }
};
