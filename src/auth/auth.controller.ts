import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  signUp(@Body(ValidationPipe) registerDto: RegisterDto): Promise<void> {
    return this.authService.registerUser(registerDto);
  }

}
