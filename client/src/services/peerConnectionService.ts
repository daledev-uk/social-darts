import { store } from '@/store';
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
		console.log('createNewConnection()');
		const p2pConn = new RTCPeerConnection();
		p2pConn.onnegotiationneeded=this.negotiationEventHandler;
		p2pConn.onicecandidate=this.iceCandidateEventHandler;
		return p2pConn;
	}

	public async createOfferOfConnection(p2pConn: RTCPeerConnection): Promise<RTCSessionDescriptionInit> {
		const offer = await p2pConn.createOffer();
		await p2pConn.setLocalDescription(new RTCSessionDescription(offer));
		console.log('createOfferOfConnection()', p2pConn);
		return offer;
	}

	public async attachOfferToConnection(p2pConn: RTCPeerConnection, remoteOffer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
		await p2pConn.setRemoteDescription(new RTCSessionDescription(remoteOffer));
		const answer = await p2pConn.createAnswer();
		await p2pConn.setLocalDescription(new RTCSessionDescription(answer));
		console.log('attachOfferToConnection()', p2pConn);
		return answer;
	}

	public async attachAnswerToConnection(p2pConn: RTCPeerConnection, remoteAnswer: RTCSessionDescriptionInit): Promise<void> {
		if (p2pConn.signalingState !== 'stable') {
			await p2pConn.setRemoteDescription(new RTCSessionDescription(remoteAnswer));
			console.log('attachAnswerToConnection() attached', p2pConn);
		} else {
			console.log('attachAnswerToConnection() attached NOT made, state already stable', p2pConn, remoteAnswer);
		}

	}

	public async createAnswer(p2pConn: RTCPeerConnection): Promise<void> {
		const answer = await p2pConn.createAnswer();
		await p2pConn.setRemoteDescription(new RTCSessionDescription(answer));
		console.log('createAnswer()', p2pConn);
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

	private iceCandidateEventHandler(event: any) {
		if (event.candidate == null) {
			console.log("All ICE Candidates are sent", event);
		} else {
			console.log("Send ICE Candidate", event);
		}
	}

	private negotiationEventHandler() {
		console.log('Handle Negotitation');
	}
}

export const peerApi = new PeerConnectionService();
