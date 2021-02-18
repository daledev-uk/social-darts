import { CreateUserRequest } from "./models/createUserRequest"
import { User } from "./models/user";
import {userRepo} from './userRepo';
import { v4 as uuidv4 } from 'uuid';

class GetOrCreateUser {
    public async run(request: CreateUserRequest): Promise<User> {
        console.log('Get or create User', request);
        const existingUser = await userRepo.getByEmail(request.email);
        if (existingUser) {
            return existingUser;
        }
        
        return userRepo.create({
            id: uuidv4(),
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

export const getOrCreateUser = new GetOrCreateUser()