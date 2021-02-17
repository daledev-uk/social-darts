import { User } from "../../features/users/models/user";

export interface LoginResponse {
    success: boolean;
    user?: User;
    token?: string;
}