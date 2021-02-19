import { BaseUserRepo } from '../../repository/baseRepo';
import { User } from './models/user';

class UserRepo extends BaseUserRepo<User> {
    constructor() {
        super('users');
    }

    public async getByEmail(email: string): Promise<User> {
        const query = this.collection.where('email', '==', email);
        const users = await this.query(query);
        if (users.length === 1) {
            return users[0];
        }
        return undefined;
    }
}

export const userRepo = new UserRepo(); 