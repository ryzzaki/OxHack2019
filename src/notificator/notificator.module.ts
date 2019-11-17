import { Module } from '@nestjs/common';
import { NotificatorService } from './notificator.service';
import { NotificatorController } from './notificator.controller';
import { LocatorModule } from '../locator/locator.module';

@Module({
  imports: [LocatorModule],
  providers: [NotificatorService],
  controllers: [NotificatorController],
})
export class NotificatorModule {}
