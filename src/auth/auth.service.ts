import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LocatorService } from '../locator/locator.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly locatorService: LocatorService,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<void> {
    const { firstName, lastName, address, email, password, latitude, longitude } = registerDto;
    const hashedPass = await this.hashPassword(password);
    const user: User = await this.userRepository.registerUser(firstName, lastName, address, email, hashedPass);
    await this.locatorService.createLocation(latitude, longitude, user);
    return;
  }

  async loginUser(loginDto: LoginDto): Promise<void> {
    const { email, password } = loginDto;
    await this.userRepository.isValidPassword(email, password);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
