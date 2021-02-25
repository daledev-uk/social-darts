import { BaseRequest } from "./baseRequest";

export interface CreateVideoSourceUrlRequest extends BaseRequest {
    socketId: string;
    p2pId: string;
    offer: any;
}