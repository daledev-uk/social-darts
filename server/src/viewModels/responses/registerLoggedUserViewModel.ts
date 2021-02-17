import { OnlineUser } from "../onlineUser";

export interface RegisterLoggedOnUserResponse {
    registeredUser: OnlineUser;
    onlineUsers: OnlineUser[];
}