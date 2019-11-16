import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(registerDto: RegisterDto): Promise<void>;
    loginIn(loginDto: LoginDto): Promise<void>;
}
