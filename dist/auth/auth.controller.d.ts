import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(registerDto: RegisterDto): Promise<User>;
    loginIn(loginDto: LoginDto, res: any): Promise<User>;
}
