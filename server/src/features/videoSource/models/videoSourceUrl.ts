import { BaseRecord } from "../../../repository/baseRecord";

export interface VideoSourceUrl extends BaseRecord {
    offer: string;
    userId: string;
    socketId: string;
}