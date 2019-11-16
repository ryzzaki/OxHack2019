import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserRepository extends Repository<User> {
    registerUser(firstName: string, lastName: string, address: string, email: string, hashedPass: string): Promise<User>;
}
