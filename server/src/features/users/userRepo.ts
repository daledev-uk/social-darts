import {CollectionReference, DocumentData, Firestore} from '@google-cloud/firestore';
import { User } from './models/user';

const serviceAccountCredentials = require('../../config/service-account.json');

class UserRepo {
    private firestore: Firestore;
    private collection: CollectionReference<DocumentData>;

    constructor() {
        this.firestore = new Firestore({
            projectId: serviceAccountCredentials.project_id,
            credentials: serviceAccountCredentials
        });
        this.collection = this.firestore.collection('users');
    }

    public async get(id: string): Promise<User> {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return undefined;
        }
        return (doc.data as any) as User;
    }

    public async create(user: User): Promise<User> {
        const doc = this.collection.doc(user.email);        
        const result = await doc.set(user);
        console.log('result', result);
        return user;
    }
}

export const userRepo = new UserRepo(); 