import {store} from '@/store';
import { ON_TRACK_ADDED_TO_PEER_CONNECTION } from '@/store/screenShare/actionTypes';

class PeerConnectionService {
	private RTCPeerConnection: any;
	private RTCSessionDescription: any;

	private peerConnection: RTCPeerConnection;

	public setup(window: any) {
		this.RTCPeerConnection = window.RTCPeerConnection;
		this.RTCSessionDescription = window.RTCSessionDescription;
	}

	public createPeerConnection() {
		this.peerConnection = new RTCPeerConnection();
		this.peerConnection.ontrack = ({ streams: [stream] }) => this.ontrack(stream);
	}

	public createNewConnection(): RTCPeerConnection {
		return new RTCPeerConnection();
	}

	public async createOfferOfConnection(connection: RTCPeerConnection): Promise<RTCSessionDescriptionInit> {
		const offer = await connection.createOffer();
		await connection.setLocalDescription(new RTCSessionDescription(offer));
		return offer;
	}

	public async attachOfferToConnection(p2pConn: RTCPeerConnection, remoteOffer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
		await p2pConn.setRemoteDescription(new RTCSessionDescription(remoteOffer));
		const answer = await p2pConn.createAnswer();
		await p2pConn.setLocalDescription(new RTCSessionDescription(answer));
		return answer;
	}

	public async attachAnswerToConnection(p2pConn: RTCPeerConnection, remoteAnswer: RTCSessionDescriptionInit): Promise<void> {
		await p2pConn.setRemoteDescription(new RTCSessionDescription(remoteAnswer));
	}

	public async createAnswer(p2pConn: RTCPeerConnection): Promise<void> {
		const answer = await p2pConn.createAnswer();
		await p2pConn.setRemoteDescription(new RTCSessionDescription(answer));
	}

	public addMediaStream(mediaStream: MediaStream) {
		mediaStream.getTracks().forEach(track => this.peerConnection.addTrack(track, mediaStream));
	}

	public async setupLocalPeerOffer(): Promise<RTCSessionDescriptionInit> {
		const offer = await this.peerConnection.createOffer();
		await this.peerConnection.setLocalDescription(new RTCSessionDescription(offer));
		return offer;
	}

	public async setupRemotePeerFromAnswer(answer: RTCSessionDescriptionInit) {
		await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
	}

	public async setupPeerToPeerConnection(remoteOffer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
		await this.peerConnection.setRemoteDescription(new RTCSessionDescription(remoteOffer));
		const answer = await this.peerConnection.createAnswer();
		await this.peerConnection.setLocalDescription(new RTCSessionDescription(answer));
		return answer;
	}

	private ontrack(stream: MediaStream) {
		return store.dispatch(ON_TRACK_ADDED_TO_PEER_CONNECTION, stream);
	}
}

export const peerApi = new PeerConnectionService();
