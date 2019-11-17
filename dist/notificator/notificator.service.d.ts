import { LocatorService } from '../locator/locator.service';
import { OriginDto } from './dto/origin.dto';
export declare class NotificatorService {
    private readonly locatorService;
    constructor(locatorService: LocatorService);
    callHelp(originDto: OriginDto): Promise<void>;
    callHelpHard(): Promise<void>;
    sendNotifications(originLat: number, originLong: number, length: number, travelTime: number, userId: number, ambulanceEta: number, description: string): Promise<void>;
    private calculateDistance;
    private constructData;
}
