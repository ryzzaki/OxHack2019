import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { NotificatorService } from './notificator.service';
import { OriginDto } from './dto/origin.dto';

@Controller('/api/notificator')
export class NotificatorController {
  constructor(
    private readonly notificatorService: NotificatorService,
  ) {}

  @Post('/call')
  callHelp(@Body(ValidationPipe) originDto: OriginDto): Promise<void> {
    this.notificatorService.callHelp(originDto);
    return;
  }

  @Get('/callhard')
  callHelpHard(): Promise<void> {
    // this.notificatorService.callHelpHard();
    this.notificatorService.sendNotifications(51.752022, -1.257726, 12, 70, 3, 300, 'CPR REQUIRED');
    return;
  }

  @Get('/test')
  test(): Promise<void> {
    this.notificatorService.sendNotifications(51.752022, -1.257726, 12, 70, 3, 300, 'CPR REQUIRED');
    return;
  }
}
