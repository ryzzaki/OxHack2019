import { Controller, Post, Body, ValidationPipe, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  signUp(@Body(ValidationPipe) registerDto: RegisterDto): Promise<User> {
    return this.authService.registerUser(registerDto);
  }

  @Post('/login')
  loginIn(@Body(ValidationPipe) loginDto: LoginDto, @Res() res: any): Promise<User> {
    return this.authService.loginUser(loginDto, res);
  }
}
