import express, { Application } from "express";
import cors from "cors";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import {googleSecurity} from "./security/googleSecurity";
import { apiAuthentication } from "./security/apiAuthentication";
import { registerUser } from "./features/users/registerUser";
import { socketManager } from "./features/onlineUsers/socketManager";
import { videoSourceController } from "./features/videoSource/videoSourceController";

export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        
        this.httpServer = createServer(this.app);
        this.setupRouting(this.app);
        this.io = socketIO(this.httpServer);

        this.handleSocketConnection();
    }

    private setupRouting(app: express.Application) {
        app.use((req, res, next) => apiAuthentication.authenticate(req, res, next));
    
        app.get('/login', (req, res) => googleSecurity.login(req, res));
        app.get('/login/callback', (req, res) => googleSecurity.loginCallback(req, res));

        app.post('/users/register', (req, res) => registerUser.run(req, res));

        app.post('/video-source', (req, res) => videoSourceController.create(req, res));
        app.get('/video-source/:id', (req, res) => videoSourceController.get(req, res));
    }

    private handleSocketConnection(): void {
        this.io.on("connection", socket => {
            if (!socketManager.isSocketRegistered(socket)) {
                socketManager.addSocket(socket);
            }

            socket.on("disconnect", () => {
                const removedUser = socketManager.removeUser(socket.id);
                if (removedUser) {
                    socket.broadcast.emit("remove-user", removedUser);
                }                
            });

            socket.on("IDENTIFY", (userId: string) => {
                socketManager.linkSocketToUser(socket.id, userId);
            });
            
            socket.on("MEDIA_STREAM_OFFER", (data: any) => {
                socket.to(data.to).emit("MEDIA_STREAM_OFFER", {
                    offer: data.offer,
                    socket: socket.id
                });
            });

            socket.on("ACCEPTED_STREAM_OFFER", data => {
                socket.to(data.to).emit("MEDIA_STREAM_ACCEPTED", { // answer-made
                    socket: socket.id,
                    answer: data.answer
                });
            });

            socket.on("CONFIRM_VIDEO_SOURCE", data => {
                const receiptientSocket = socketManager.getSocketByUserId(data.userId);
                const to = socket.to(data.to);
                receiptientSocket?.emit("VIDEO_SOURCE_CONFIRMED", {
                    videoSourceId: data.videoSourceId,
                    videoSourceSocketId: data.from
                });

                to?.emit("VIDEO_SOURCE_CONFIRMED", {
                    videoSourceId: data.videoSourceId,
                    videoSourceSocketId: data.from
                });
            });
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () => {
            callback(this.DEFAULT_PORT);
        });
    }
}