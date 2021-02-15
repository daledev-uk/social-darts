import Vue from "vue";

class SocketService {
	private socket: SocketIOClient.Socket;

	public init(socket: SocketIOClient.Socket) {
		this.socket = socket;
	}

	public async offerUserVideoShare(socketId: string, offer: RTCSessionDescriptionInit) {
		this.socket.emit("MEDIA_STREAM_OFFER", {
			offer,
			to: socketId
		});
	}

	public acceptMediaStreamShare(answer: RTCSessionDescriptionInit, socketId: string) {
		this.socket.emit("ACCEPTED_STREAM_OFFER", {
			answer,
			to: socketId
		});
	}
}

export const socketApi = new SocketService();
