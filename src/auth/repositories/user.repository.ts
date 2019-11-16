import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async registerUser(firstName: string, lastName: string, address: string , email: string, hashedPass: string): Promise<User> {
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.address = address;
    user.email = email;
    user.password = hashedPass;
    await this.save(user);
    return user;
  }
}
