import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { LocatorService } from '../locator/locator.service';
import { LocatorModule } from '../locator/locator.module';
import { LocationRepository } from 'src/locator/repositories/location.repository';

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
