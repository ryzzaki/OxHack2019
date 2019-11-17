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

  @Get('/test')
  test(): Promise<void> {
    this.notificatorService.sendNotifications(30, 30, 30, 30, 30);
    return;
  }
}
