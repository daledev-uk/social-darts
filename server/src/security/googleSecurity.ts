import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import {google} from 'googleapis';
import {getOrCreateUser} from '../features/users/getOrCreateUser';
import { User } from '../features/users/models/user';
import { LoginResponse } from '../viewModels/responses/loginResponse';
import { apiAuthentication } from './apiAuthentication';

const keys = require('../config/google_client_secret.json');

class GoogleSecurity {

    public async login(request: Request, response: Response) {
        const oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        );

        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        });

        response.redirect(authorizeUrl);
    }

    public async loginCallback(request: Request, response: Response) {
        let responseContent: LoginResponse;
        try {
            const code = request.query.code as string;
            const oAuth2Client = new OAuth2Client(
                keys.web.client_id,
                keys.web.client_secret,
                keys.web.redirect_uris[0]
            );
    
            const tokenResponse = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokenResponse.tokens);

            const userProfile = await this.getUserProfile(tokenResponse.tokens.access_token);
            const user: User = await getOrCreateUser.run({
                givenName: userProfile.given_name,
                lastName: userProfile.family_name,
                displayName: userProfile.name,
                email: userProfile.email,
                profileImage: userProfile.picture
            });

            responseContent = {
                success: true,
                user,
                token: apiAuthentication.createJwt(user)
            };
        } catch(err) {
            console.error('Failed to login: ', err);
            responseContent = { success: false };            
        }

        response.end(JSON.stringify(responseContent));
    };

    private async getUserProfile(accessToken: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const oauth2Client = new google.auth.OAuth2();
            oauth2Client.setCredentials({access_token: accessToken});
            const oauth2 = google.oauth2({
                auth: oauth2Client,
                version: 'v2'
            });
    
            oauth2.userinfo.get((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.data);
                }
            });
        });
    }
}

export const googleSecurity = new GoogleSecurity();