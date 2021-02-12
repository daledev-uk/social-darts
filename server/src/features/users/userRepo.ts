import {Firestore} from '@google-cloud/firestore';
import { User } from './models/user';

const serviceAccountCredentials = require('../../config/service-account.json');

class UserRepo {
    private firestore: Firestore; 

    constructor() {
        this.firestore = new Firestore({
            projectId: serviceAccountCredentials.project_id,
            credentials: serviceAccountCredentials
        });
    }

    public async create(user: User): Promise<User> {
        const document = this.firestore.doc(`users/${user.email}`);        
        const result = await document.set(user);
        console.log('result', result);
        return user;
    }
}

export const userRepo = new UserRepo(); 