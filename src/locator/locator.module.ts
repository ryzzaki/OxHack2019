import { Module } from '@nestjs/common';
import { LocatorService } from './locator.service';
import { LocatorController } from './locator.controller';
import { LocationRepository } from './repositories/location.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LocationRepository,
    ]),
  ],
  providers: [LocatorService],
  controllers: [LocatorController],
  exports: [LocatorService],
})
export class LocatorModule {}
