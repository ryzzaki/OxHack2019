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
        await this.sendNotifications(originLat, originLong, person.length, person.travelTime, person.id, etaInSeconds);
      }
    }
  }

  async sendNotifications(originLat: number, originLong: number, length: number, travelTime: number, userId: number, ambulanceEta: number): Promise<void> {
    const serviceAccount = require('../../oxfordhack2019-99a45-firebase-adminsdk-ocfvv-cb67a5d2e6.json');

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://oxfordhack2019-99a45.firebaseio.com',
      });
    }

    const registrationTokens = [
      'eDz3vM_Cwuo:APA91bGPJ9dbqndV92eTSmrYXlUrtti_YFxev0oj0epAYBr082pdNl45k2D0c0c2YAiFzl7hvIFVImecxk7JNxskqBAr2KEzQa9LKm97vtBmExpuZ9wzTQLWXQkZeXB7C72sCZgdRQeE',
    ];

    const message = {
      notification: {
        title: 'EMERGENCY',
        body: `PERSON IN VICINITY OF ${length} METRES NEEDS YOUR AID!`,
      },
      android: {
        ttl: ambulanceEta * 1000,
        notification: {
          // icon: '../../icons/HeroLogo10x10.png',
          color: '#f45342',
          sound: 'default',
        },
      },
      data: {
        longitude: String(originLong),
        latitude: String(originLat),
        userId: String(userId),
        lengthInMeters: String(length),
        travelTimeInSeconds: String(travelTime),
      },
      tokens: registrationTokens,
    };

    admin.messaging().sendMulticast(message)
      .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
        console.log(response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
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
