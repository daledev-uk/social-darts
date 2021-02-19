import { BaseRequest } from "./baseRequest";

export interface CreateVideoSourceUrlRequest extends BaseRequest {
    socketId: string;
    offer: string;
}