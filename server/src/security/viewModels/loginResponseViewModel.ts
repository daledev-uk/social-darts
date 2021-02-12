import { User } from "../../features/users/models/user";

export interface LoginResponseViewModel {
    success: boolean;
    user?: User;
    token?: string;
}