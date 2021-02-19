import { BaseRecord } from "../../../repository/baseRecord";

export interface User extends BaseRecord {
    givenName: string;
    lastName: string;
    displayName: string;
    email: string;
    profileImage: string;
    totalGames: number;
    totalWon: number;
    totalThrownDarts: number;
    average: number;
}