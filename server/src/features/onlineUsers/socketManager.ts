import { OnlineUser } from "../../viewModels/onlineUser";
import { Socket } from "socket.io";

class SocketManager {
    private usersByUserId: { [userId: string]: OnlineUser } = {};
    private usersBySocketId: { [socketId: string]: OnlineUser } = {};
    private socketsBySocketId: { [socketId: string]: Socket } = {};

    public isSocketRegistered(socket: Socket): boolean {
        return !!this.socketsBySocketId[socket.id];
    }

    public getSocketByUserId(userId: string): Socket {
        const user = this.usersByUserId[userId];
        return this.socketsBySocketId[user?.socketId];
    }

    public addSocket(socket: Socket) {
        this.socketsBySocketId[socket.id] = socket;
        this.usersBySocketId[socket.id] = { socketId: socket.id } as OnlineUser;
    }

    public addUser(user: OnlineUser) {
        this.usersByUserId[user.userId] = user;
        this.usersBySocketId[user.socketId] = user;

        if (this.socketsBySocketId[user.socketId]) {
            this.socketsBySocketId[user.socketId].broadcast.emit('NEW_USER_ONLINE', user);
        }        
    }

    public linkSocketToUser(socketId: string, userId: string) {
        const user = this.usersByUserId[userId] ?? {} as OnlineUser;
        user.socketId = socketId;
        this.usersByUserId[userId] = user;
    }

    public removeUser(socketId: string): OnlineUser {
        const user = this.usersBySocketId[socketId];
        if (user) {
            user.socketId = null;
        }        
        delete this.usersBySocketId[socketId];
        delete this.socketsBySocketId[socketId];
        return user;
    }

    public getUserBySocketId(socketId: string): OnlineUser {
        return this.usersBySocketId[socketId];
    }

    public getAllUsers(): OnlineUser[] {
        return Object.values(this.usersByUserId).filter(usr => !!usr.userId && !!usr.socketId);
    }
}

export const socketManager = new SocketManager();