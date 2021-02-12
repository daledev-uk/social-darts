import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import * as jwt from "jsonwebtoken";
import { InitResponseViewModel } from './models/initResponseViewModel';

const keys = require('../config/google_client_secret.json');
const SECRET_KEY = "SECRET123"; // Move to system property

class Init {

    public async run(request: Request, response: Response) {
        const oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        );

        // Generate the url that will be used for the consent dialog.
        const responseBody = {} as InitResponseViewModel;

        response.end(JSON.stringify(responseBody));
    }
}

export const init = new Init();