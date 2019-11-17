import { LocationDto } from './dto/location.dto';
import { User } from '../auth/entities/user.entity';
import { LocatorService } from './locator.service';
export declare class LocatorController {
    private readonly locatorService;
    constructor(locatorService: LocatorService);
    updateLocation(locationDto: LocationDto, user: User): Promise<void>;
}
