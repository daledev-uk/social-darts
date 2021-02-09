import Vue from "vue";

class SocketService {
	private socket: SocketIOClient.Socket;
    private RTCPeerConnection: any;
    private RTCSessionDescription: any;

    private peerConnection: RTCPeerConnection;

    public init(window: any, socket: SocketIOClient.Socket) {
        this.RTCPeerConnection = window.RTCPeerConnection;
        this.RTCSessionDescription = window.RTCSessionDescription;
        this.socket = socket;
        this.peerConnection = new RTCPeerConnection();
    }

    public addMediaTracks(mediaStream: MediaStream) {
        mediaStream.getTracks().forEach(track => this.peerConnection.addTrack(track, mediaStream));
    }
	
    public async offerUserVideoShare(socketId: string) {
		const offer = await this.peerConnection.createOffer();
		await this.peerConnection.setLocalDescription(new RTCSessionDescription(offer));

		console.log('this.$socket', this.socket);
		this.socket.emit("MEDIA_STREAM_OFFER", {
			offer,
			to: socketId
		});
	}
}

export const socketApi = new SocketService();