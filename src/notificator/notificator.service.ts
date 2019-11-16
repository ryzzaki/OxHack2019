import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LocatorService } from '../locator/locator.service';
import * as admin from 'firebase-admin';
import { Location } from '../locator/entities/location.entity';
import appConfig from '../config/env.config';
import { OriginDto } from './dto/origin.dto';

@Injectable()
export class NotificatorService {
  constructor(
    private readonly locatorService: LocatorService,
  ) {}

  async callHelp(originDto: OriginDto): Promise<void> {
    // some code
    const { originLat, originLong } = originDto;
    await this.calculateDistance(originLat, originLong);
    await this.sendNotifications();
  }

  private async sendNotifications(): Promise<void> {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
    });

    const registrationTokens = [
      'YOUR_REGISTRATION_TOKEN_1',
      'YOUR_REGISTRATION_TOKEN_N',
    ];

    const message = {
      data: {
        score: '850',
        time: '2:45',
      },
      tokens: registrationTokens,
    };

    admin.messaging().sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
  });
  }

  private async calculateDistance(originLat: number, originLong: number): Promise<number[]> {
    // COMPLETE THE CALCULATE ALGO
    const userIds = [];
    // this is how you request
    const locations = await this.locatorService.getAllLocations();
    const api = appConfig.serverSettings.azureApi;
    const data = await this.constructData(23, 32, locations);
    const result = await axios.post(api, data);
    console.log(result);
    return userIds;
  }

  private async constructData(originLat: number, originLong: number, locations: Location[]): Promise<{ data: any }> {
    const listCoordinates = [];
    for (const location of locations) {
      listCoordinates.push([location.latitude, location.longitude]);
    }
    const data: any = {
      origins: {
        type: 'MultiPoint',
        coordinates: [
          [
            originLat,
            originLong,
          ],
        ],
      },
      destinations: {
        type: 'MultiPoint',
        coordinates: listCoordinates,
      },
    };
    return data;
  }
}
