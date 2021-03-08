class PeerConnectionService {
	private RTCPeerConnection: any;
	private RTCSessionDescription: any;

	public setup(window: any) {
		this.RTCPeerConnection = window.RTCPeerConnection;
		this.RTCSessionDescription = window.RTCSessionDescription;
	}

	public createNewConnection(): RTCPeerConnection {
		return new RTCPeerConnection();		
	}

	public async createOfferOfConnection(p2pConn: RTCPeerConnection): Promise<RTCSessionDescriptionInit> {
		const offer = await p2pConn.createOffer();
		await p2pConn.setLocalDescription(new RTCSessionDescription(offer));
		console.log('Set Local to new offer', offer);
		return offer;
	}

	public async attachOfferToConnection(p2pConn: RTCPeerConnection, remoteOffer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
		await p2pConn.setRemoteDescription(new RTCSessionDescription(remoteOffer));
		console.log('Set remote to recieved offer', remoteOffer);
		const answer = await p2pConn.createAnswer();
		await p2pConn.setLocalDescription(new RTCSessionDescription(answer));
		console.log('Set local to new answer', answer);
		return answer;
	}

	public async attachAnswerToConnection(p2pConn: RTCPeerConnection, remoteAnswer: RTCSessionDescriptionInit): Promise<void> {
		if (p2pConn.signalingState !== 'stable') {
			await p2pConn.setRemoteDescription(new RTCSessionDescription(remoteAnswer));
			console.log('set remote to received answer', remoteAnswer);
		} else {
			console.log('set remote to received NOT performed as already set!>!', p2pConn.remoteDescription, remoteAnswer);
		}
	}
}

export const peerApi = new PeerConnectionService();
