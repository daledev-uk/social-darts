import { authentication } from "@/security/authentication";
import { store } from "@/store";
import { LOAD_CONNECTED_USER } from "@/store/app/actionTypes";

class SocketService {
	private socket: SocketIOClient.Socket;

	public init(socket: SocketIOClient.Socket) {
		this.socket = socket;
		if(this.socket.id) {
			this.onSocketConnected();
		} else {
			this.socket.on('connect', () => this.onSocketConnected());
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

    public confirmVideoForSource(to: string, videoSourceId: string) {
        this.socket.emit("CONFIRM_VIDEO_SOURCE", {			
			to,
            from: this.socket.id,
            videoSourceId
		});
    }

    private onSocketConnected() {
        if (authentication.isAuthenticated()) {
            store.dispatch(LOAD_CONNECTED_USER, this.socket.id);
        }
    }
}

export const socketApi = new SocketService();
