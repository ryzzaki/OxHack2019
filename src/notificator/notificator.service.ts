import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotificatorService {
  private async calculateDistance(): Promise<number[]> {
    // COMPLETE THE CALCULATE ALGO
    const userIds = [];
    // this is how you request
    const result = await axios.post('url.com');
    return userIds;
  }
}
