import { authentication } from "@/security/authentication";
import { store } from "@/store";
import { LOAD_CONNECTED_USER } from "@/store/app/actionTypes";
import { SET_SOCKET_ID } from "@/store/app/mutationTypes";
import { P2PConnection, RemotePeer } from "@/store/screenShare";

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

    public confirmVideoForSource(p2pConnId: string, remotePeer: RemotePeer, answer: RTCSessionDescriptionInit) {
        this.socket.emit('SEND_ANSWER', {		
			p2pConnId,
			answer,
			from: this.socket.id,
			to : {
				socketId: remotePeer.socketId,
				userId: remotePeer.userId
			}            			
		});
    }

	public sendP2pOffer(p2pConn: P2PConnection) {
		this.socket.emit('SEND_NEW_OFFER', {		
			p2pConnId: p2pConn.id,
			offer: p2pConn.offer,
			from: this.socket.id,
			to : {
				socketId: p2pConn.remotePeer.socketId,
				userId: p2pConn.remotePeer.userId
			}            			
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
