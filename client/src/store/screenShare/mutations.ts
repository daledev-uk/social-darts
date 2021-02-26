import { MutationTree } from 'vuex';
import { P2PConnection, ScreenShareState } from '.';
import { ADD_P2P_CONNECTION, ADD_TRACK_TO_P2P_CONNECTION, SET_P2P_RECIEVED, SET_REMOTE_MEDIA_STREAM, UPDATE_USER_LIST } from './mutationTypes';

export const mutations: MutationTree<ScreenShareState> = {

	[UPDATE_USER_LIST](state, updateUserListPayload: any) {
		state.users.push(...updateUserListPayload.users);
	},

	[ADD_P2P_CONNECTION](state, p2pConnection: P2PConnection) {
		state.connections[p2pConnection.id] = p2pConnection;
		state.connections = set(state.connections);
	},

    [ADD_TRACK_TO_P2P_CONNECTION](state, { connectionId, stream }) {
        console.log('ADD_TRACK_TO_P2P_CONNECTION', stream);
        state.connections[connectionId].streams.push(stream);
		state.connections = set(state.connections);
    },

	[SET_P2P_RECIEVED](state, p2pId: string) {
		console.log(SET_P2P_RECIEVED, p2pId);
		state.connections[p2pId].receivedResponse = true;
		state.connections = set(state.connections);
	},

	[SET_REMOTE_MEDIA_STREAM](state, stream: MediaStream) {
		console.log(SET_REMOTE_MEDIA_STREAM, stream);
		state.remoteMediaStream = stream;
	}
};

// Vuex doesn't detect changes to items in an array,
// so we have to mutate the array itself to maintain
// reactivity
function set(obj: object) {
	return { ...obj };
}