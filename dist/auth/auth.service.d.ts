import { UserRepository } from './repositories/user.repository';
import { RegisterDto } from './dto/register.dto';
import { LocatorService } from '../locator/locator.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly locatorService;
    constructor(userRepository: UserRepository, locatorService: LocatorService);
    registerUser(registerDto: RegisterDto): Promise<void>;
    loginUser(loginDto: LoginDto, res: any): Promise<void>;
    private hashPassword;
}
