import { User } from "./user";

export interface AuthenticatedUserViewModel {
    success: boolean;
    user?: User;
    token?: string;
}