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
    const api = 'url.com';
    const data = 'some data';
    const result = await axios.post(api, data);
    return userIds;
  }
}
