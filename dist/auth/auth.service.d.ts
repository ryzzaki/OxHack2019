import { UserRepository } from './repositories/user.repository';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    registerUser(registerDto: RegisterDto): Promise<void>;
    private hashPassword;
}
