import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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

  async isValidPassword(email: string, inputPassword: string): Promise<boolean> {
    const identity = await this.findOne({ where: [{ email }] });
    if (identity == null) {
      throw new NotFoundException(`Email Identity NOT FOUND for User email: ${email}`);
    }
    if (!await bcrypt.compare(inputPassword, identity.password)) {
      throw new UnauthorizedException('BCrypt comparison is false');
    }
    return true;
  }
}
