import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

const keys = require('./google_client_secret.json');

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
        try {
            const code = request.query.code as string;
            const oAuth2Client = new OAuth2Client(
                keys.web.client_id,
                keys.web.client_secret,
                keys.web.redirect_uris[0]
            );
    
            const tokenResponse = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokenResponse.tokens);

            response.end(JSON.stringify({success: true}));
        } catch(err) {
            response.end(JSON.stringify({success: false}));
        }
    };
}

export const googleSecurity = new GoogleSecurity();