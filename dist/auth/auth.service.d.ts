import { UserRepository } from './repositories/user.repository';
import { RegisterDto } from './dto/register.dto';
import { LocatorService } from '../locator/locator.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly locatorService;
    constructor(userRepository: UserRepository, locatorService: LocatorService);
    registerUser(registerDto: RegisterDto): Promise<void>;
    private hashPassword;
}
