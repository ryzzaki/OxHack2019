import { Module } from '@nestjs/common';
import { NotificatorService } from './notificator.service';
import { NotificatorController } from './notificator.controller';

@Module({
  providers: [NotificatorService],
  controllers: [NotificatorController]
})
export class NotificatorModule {}
