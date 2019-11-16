import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { LocationDto } from './dto/location.dto';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { LocatorService } from './locator.service';

@Controller('/api/locator')
export class LocatorController {
  constructor(
    private readonly locatorService: LocatorService,
  ) {}

  @Post('/update')
  updateLocation(@Body(ValidationPipe) locationDto: LocationDto, @GetUser() user: User): Promise<void> {
    return this.locatorService.updateLocation(locationDto, user);
  }
}
