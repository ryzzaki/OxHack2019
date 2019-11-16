import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { LocatorModule } from '../locator/locator.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
    LocatorModule,
  ],
  providers: [
    AuthService,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
