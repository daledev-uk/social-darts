import { OnlineUser } from "../../viewModels/onlineUser";
import { Socket } from "socket.io";

class SocketManager {
    private usersByUserId: { [userId: string]: OnlineUser } = {};
    private usersBySocketId: { [userId: string]: OnlineUser } = {};
    private socketsBySocketId: { [userId: string]: Socket } = {};

    public isSocketRegistered(socket: Socket): boolean {
        return !!this.socketsBySocketId[socket.id];
    }

    public addSocket(socket: Socket) {
        this.socketsBySocketId[socket.id] = socket;
        this.usersBySocketId[socket.id] = { socketId: socket.id } as OnlineUser;
    }

    public addUser(user: OnlineUser) {
        this.usersByUserId[user.userId] = user;
        this.usersBySocketId[user.socketId] = user;

        this.socketsBySocketId[user.socketId].broadcast.emit('NEW_USER_ONLINE', user);
    }

    public removeUser(user: OnlineUser) {
        delete this.usersByUserId[user.userId];
        delete this.usersBySocketId[user.socketId];
        delete this.socketsBySocketId[user.socketId];
    }

    public getUserBySocketId(socketId: string): OnlineUser {
        return this.usersBySocketId[socketId];
    }

    public getAllUsers(): OnlineUser[] {
        return Object.values(this.usersByUserId);
    }
}

export const socketManager = new SocketManager();