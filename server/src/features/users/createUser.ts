import { CreateUserRequest } from "./models/createUserRequest"
import {userRepo} from './userRepo';

class CreateUser {
    public async run(request: CreateUserRequest) {
        console.log('Create User', request);
        await userRepo.create({
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