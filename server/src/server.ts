import express, { Application } from "express";
import cors from "cors";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import {googleSecurity} from "./security/googleSecurity";
import { apiAuthentication } from "./security/apiAuthentication";

export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;

    private activeSockets: string[] = [];

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        this.app = express();
        this.app.use(cors());
        this.httpServer = createServer(this.app);
        this.setupRouting(this.app);
        this.io = socketIO(this.httpServer);

        this.handleSocketConnection();
    }

    private setupRouting(app: express.Application) {
        app.use(apiAuthentication.authenticate);
    
        app.get('/login', (req, res) => googleSecurity.login(req, res));
        app.get('/login/callback', (req, res) => googleSecurity.loginCallback(req, res));

        app.get('/init', (req, res) => googleSecurity.loginCallback(req, res));
    }

    private handleSocketConnection(): void {
        this.io.on("connection", socket => {
            const existingSocket = this.activeSockets.find(
                existingSocket => existingSocket === socket.id
            );

            if (!existingSocket) {
                this.activeSockets.push(socket.id);

                socket.emit("UPDATE_USER_LIST", {
                    users: this.activeSockets.filter(
                        existingSocket => existingSocket !== socket.id
                    )
                });

                socket.broadcast.emit("UPDATE_USER_LIST", {
                    users: [socket.id]
                });
            }

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

            socket.on("reject-call", data => {
                socket.to(data.from).emit("call-rejected", {
                    socket: socket.id
                });
            });

            socket.on("disconnect", () => {
                this.activeSockets = this.activeSockets.filter(
                    existingSocket => existingSocket !== socket.id
                );
                socket.broadcast.emit("remove-user", {
                    socketId: socket.id
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