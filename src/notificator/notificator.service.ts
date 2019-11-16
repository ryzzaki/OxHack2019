import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LocatorService } from '../locator/locator.service';
import * as admin from 'firebase-admin';
import appConfig from '../config/env.config';
import { OriginDto } from './dto/origin.dto';

@Injectable()
export class NotificatorService {
  constructor(
    private readonly locatorService: LocatorService,
  ) {}

  async callHelp(originDto: OriginDto): Promise<void> {
    const { originLat, originLong, ambulanceEta } = originDto;
    const etaInSeconds = ambulanceEta * 60;
    const relativeUsers = await this.calculateDistance(originLong, originLat);
    const sorted = relativeUsers.sort((a, b) => (a.travelTime > b.travelTime) ? 1 : ((b.travelTime > a.travelTime) ? -1 : 0));
    for (const person of sorted) {
      if (person.travelTime > etaInSeconds) {
        break;
      } else {
        await this.sendNotifications();
      }
    }
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

  private async calculateDistance(originLat: number, originLong: number): Promise<any> {
    const userIds = [];
    const listCoordinates = [];
    const relativeUsers = [];
    const locations = await this.locatorService.getAllLocations();
    for (const location of locations) {
      userIds.push(location.userId);
      listCoordinates.push([location.longitude, location.latitude]);
    }
    const api = appConfig.serverSettings.azureApi;
    const data = await this.constructData(originLat, originLong, listCoordinates);
    const result = await axios.post(api, data);
    const matrix = result.data.matrix[0];
    for (const route of matrix) {
      let relativeUser = {
        userId: userIds.shift(),
        length: route.response.routeSummary.lengthInMeters,
        travelTime: route.response.routeSummary.travelTimeInSeconds,
      };
      relativeUsers.push(relativeUser);
    }
    return relativeUsers;
  }

  private async constructData(originLat: number, originLong: number, listCoordinates: any): Promise<{ data: any }> {
    const data: any = {
      origins: {
        type: 'MultiPoint',
        coordinates: [
          [
            originLong,
            originLat,
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
