import { Module } from 'vuex';
import { AppState } from '@/store/app';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export interface ScreenShareState {
	connections: { [connectionId: string] : P2PConnection },
	users: string[];
	remoteMediaStream?: MediaStream;
}

export const screenShareState: ScreenShareState = {
	connections: {},
	users: [],
	remoteMediaStream: undefined
};

export const lobby: Module<ScreenShareState, AppState> = {
	namespaced: false,
	state: screenShareState,
	getters,
	actions,
	mutations
};

export interface P2PConnection {
	id: string,
	localPeerType: 'user'|'device'
	remotePeer: RemotePeer,
	connection: RTCPeerConnection,
	receivedResponse: boolean,
    streams: MediaStream[],
	offer?: RTCSessionDescriptionInit
}

export interface RemotePeer {
	type: 'user'|'device'|'unknown',
	socketId: string,
	userId?: string,
	offer?: RTCSessionDescriptionInit,
	answer?: RTCSessionDescriptionInit
}

export interface CreateP2PConnectionRequest {
    remotePeer: RemotePeer;
    p2pId?: string;
}