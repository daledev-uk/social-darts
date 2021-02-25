import { MutationTree } from 'vuex';
import { P2PConnection, ScreenShareState } from '.';
import { ADD_P2P_CONNECTION, SET_P2P_RECIEVED, SET_REMOTE_MEDIA_STREAM, UPDATE_USER_LIST } from './mutationTypes';

export const mutations: MutationTree<ScreenShareState> = {

	[UPDATE_USER_LIST](state, updateUserListPayload: any) {
		console.log(UPDATE_USER_LIST, updateUserListPayload);
		state.users.push(...updateUserListPayload.users);
	},

	[ADD_P2P_CONNECTION](state, p2pConnection: P2PConnection) {
		console.log(ADD_P2P_CONNECTION, p2pConnection);
		state.connections[p2pConnection.id] = p2pConnection;
	},

	[SET_P2P_RECIEVED](state, p2pId: string) {
		console.log(SET_P2P_RECIEVED, p2pId);
		state.connections[p2pId].receivedResponse = true;
	},

	[SET_REMOTE_MEDIA_STREAM](state, stream: MediaStream) {
		console.log(SET_REMOTE_MEDIA_STREAM, stream);
		state.remoteMediaStream = stream;
	}
};
