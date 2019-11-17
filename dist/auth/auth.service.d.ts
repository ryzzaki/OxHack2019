import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { RegisterDto } from './dto/register.dto';
import { LocatorService } from '../locator/locator.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly locatorService;
    constructor(userRepository: UserRepository, locatorService: LocatorService);
    registerUser(registerDto: RegisterDto): Promise<User>;
    loginUser(loginDto: LoginDto, res: any): Promise<User>;
    private hashPassword;
}
