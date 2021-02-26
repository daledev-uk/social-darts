import { authentication } from "@/security/authentication";
import { store } from "@/store";
import { LOAD_CONNECTED_USER } from "@/store/app/actionTypes";
import { SET_SOCKET_ID } from "@/store/app/mutationTypes";

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
		this.socket.emit('MEDIA_STREAM_OFFER', {
			offer,
			to: socketId
		});
	}

	public acceptMediaStreamShare(answer: RTCSessionDescriptionInit, socketId: string) {
		this.socket.emit('ACCEPTED_STREAM_OFFER', {
			answer,
			to: socketId
		});
	}

    public confirmVideoForSource(to: string, userId: string, videoSourceId: string, answer: RTCSessionDescriptionInit) {
        this.socket.emit('CONFIRM_VIDEO_SOURCE', {			
			to,
            userId,
            from: this.socket.id,
            videoSourceId,
			answer
		});
    }

    private onSocketConnected() {
        if (authentication.isAuthenticated()) {
			this.socket.emit('IDENTIFY', authentication.getUserId());
            store.dispatch(LOAD_CONNECTED_USER, this.socket.id);
        }
		this.socket.on('connected', () => store.commit(SET_SOCKET_ID, this.socket.id));
		this.socket.on('reconnect', () => store.commit(SET_SOCKET_ID, this.socket.id));
    }
}

export const socketApi = new SocketService();
