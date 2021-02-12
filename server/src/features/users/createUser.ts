import { CreateUserRequest } from "./models/createUserRequest"
import { User } from "./models/user";
import {userRepo} from './userRepo';

class CreateUser {
    public async run(request: CreateUserRequest): Promise<User> {
        console.log('Create User', request);
        return userRepo.create({
            displayName: request.displayName,
            givenName: request.givenName,
            lastName: request.lastName,
            email: request.email,
            profileImage: request.profileImage,
            totalGames: 0,
            average: 0,
            totalThrownDarts: 0,
            totalWon: 0            
        });
    }
}

export const createUser = new CreateUser()