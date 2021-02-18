import {CollectionReference, DocumentData, Firestore, Query} from '@google-cloud/firestore';
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
        return doc.data() as User;
    }

    public async getByEmail(email: string): Promise<User> {
        const query = this.collection.where('email', '==', email);
        const users = await this.query(query);
        if (users.length === 1) {
            return users[0];
        }
        return undefined;
    }

    public async create(user: User): Promise<User> {
        const doc = this.collection.doc(user.id);        
        const result = await doc.set(user);
        console.log('result', result);
        return user;
    }

    private async query(query: Query): Promise<User[]> {
        const results: User[] = [];
        const docs = await query.get();
        if (!docs.empty) {            
            docs.forEach(doc => results.push(doc.data() as User));
        }
        return results;
    }
}

export const userRepo = new UserRepo(); 