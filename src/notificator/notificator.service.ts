import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LocatorService } from '../locator/locator.service';

@Injectable()
export class NotificatorService {
  constructor(
    private readonly locatorService: LocatorService,
  ) {}

  private async calculateDistance(): Promise<number[]> {
    // COMPLETE THE CALCULATE ALGO
    const userIds = [];
    // this is how you request
    const result = await axios.post('url.com');
    return userIds;
  }
}
