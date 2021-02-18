import { store } from "@/store";
import { LOAD_CONNECTED_USER } from "@/store/app/actionTypes";

class SocketService {
	private socket: SocketIOClient.Socket;

	public init(socket: SocketIOClient.Socket) {
		this.socket = socket;
		if(this.socket.id) {
			store.dispatch(LOAD_CONNECTED_USER, this.socket.id);
		} else {
			this.socket.on('connect', () => store.dispatch(LOAD_CONNECTED_USER, this.socket.id));
		}
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
