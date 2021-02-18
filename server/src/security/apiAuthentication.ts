import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../features/users/models/user";
import { BaseRequest } from "../viewModels/requests/baseRequest";

const SECRET_KEY = "SECRET123"; // Move to system property

class ApiAuthentication {

    public createJwt(user: User): string {
        return jwt.sign(user, SECRET_KEY);
    }
    
    public async authenticate(request: Request, response: Response, next) {
        const requestedResource: string = request.originalUrl;
    
        if (requestedResource.startsWith('/login')) {
            next();
        } else {
            const result = await this.validateJwt(request.headers.authorization);
            if (!result) {
                response.status(401).send('Invalid token');
                return response.end();
            }
            if (request.body) {
                (request.body as BaseRequest).userId = result;
            }
            next();
        }
    }

    private async validateJwt(authorizationHeader: string): Promise<string> {
        if (!authorizationHeader) {
            return Promise.reject("No credentials provided");
        }
    
        const authHeaderParts: string[] = authorizationHeader.split(" ");
        if (authHeaderParts.length > 2) {
            return Promise.reject("Incorrect format of the authorization header");
        }
    
        const authType = authorizationHeader.split(" ")[0];
        if (authType !== "Bearer") {
            return Promise.reject(`Bearer was expected as the authorization type but instead "${authType}" found`);
        }
    
    
        const token = authHeaderParts[1];
        return new Promise<string>((resolve, reject) => {
            try {
                jwt.verify(token, SECRET_KEY, (err, payload: any) => {
                    if (!err) {
                        resolve(payload.id);
                    } else {
                        reject("JWT could not be verified");
                    }
                });
            } catch (ex) {
                return reject("JWT could not be verified");
            }
        });
    }
}

export const apiAuthentication = new ApiAuthentication();