import { LocatorService } from '../locator/locator.service';
import { OriginDto } from './dto/origin.dto';
export declare class NotificatorService {
    private readonly locatorService;
    constructor(locatorService: LocatorService);
    callHelp(originDto: OriginDto): Promise<void>;
    private sendNotifications;
    private calculateDistance;
    private constructData;
}
