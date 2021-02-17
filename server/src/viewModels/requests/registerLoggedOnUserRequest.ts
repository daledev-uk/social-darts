import { BaseRequest } from "./baseRequest";

export interface RegisterLoggedOnUserRequest extends BaseRequest {
    socketId: string;
}