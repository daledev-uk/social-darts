import {CollectionReference, DocumentData, Firestore, Query} from '@google-cloud/firestore';
import { BaseRecord } from './baseRecord';

const serviceAccountCredentials = require('../config/service-account.json');

export abstract class BaseUserRepo<T extends BaseRecord> {
    protected firestore: Firestore;
    protected collection: CollectionReference<DocumentData>;

    constructor(collectionName: string) {
        this.firestore = new Firestore({
            projectId: serviceAccountCredentials.project_id,
            credentials: serviceAccountCredentials
        });
        this.collection = this.firestore.collection(collectionName);
    }

    public async get(id: string): Promise<T> {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return undefined;
        }
        return doc.data() as T;
    }

    public async create(item: T): Promise<T> {
        item.createdDateUtc = new Date().getUTCDate();
        item.lastUpdatedUtc = item.createdDateUtc;
        const doc = this.collection.doc(item.id);        
        const result = await doc.set(item);
        console.log('result', result);
        return item;
    }

    public async query(query: Query): Promise<T[]> {
        const results: T[] = [];
        const docs = await query.get();
        if (!docs.empty) {            
            docs.forEach(doc => results.push(doc.data() as T));
        }
        return results;
    }
}