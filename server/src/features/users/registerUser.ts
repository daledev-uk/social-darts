import { Request, Response } from 'express';
import { RegisterLoggedOnUserRequest } from '../../viewModels/requests/registerLoggedOnUserRequest';
import { RegisterLoggedOnUserResponse } from '../../viewModels/responses/registerLoggedUserViewModel';
import { socketManager } from '../onlineUsers/socketManager';
import { userRepo } from './userRepo';

class RegisterUser {
    public async run(httpRequest: Request, response: Response) {
        const request = httpRequest.body as RegisterLoggedOnUserRequest;
        const user = await userRepo.get(request.userId);
        
        const onlineUser = { 
            userId: user.id,
            socketId: request.socketId,
            displayName: user.displayName,
            avatar: user.profileImage
        };

        socketManager.addUser(onlineUser);
        const registerResponse: RegisterLoggedOnUserResponse = {
            registeredUser: onlineUser,
            onlineUsers: socketManager.getAllUsers()
        };

        response.end(JSON.stringify(registerResponse));
    }
} 

export const registerUser = new RegisterUser();