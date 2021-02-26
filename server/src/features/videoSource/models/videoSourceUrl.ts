import { BaseRecord } from "../../../repository/baseRecord";

export interface VideoSourceUrl extends BaseRecord {
    offer: any;
    userId: string;
    socketId: string;
}