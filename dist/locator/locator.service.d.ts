import { LocationRepository } from './repositories/location.repository';
import { LocationDto } from './dto/location.dto';
import { User } from '../auth/entities/user.entity';
export declare class LocatorService {
    private readonly locationRepository;
    constructor(locationRepository: LocationRepository);
    updateLocation(locationDto: LocationDto, user: User): Promise<void>;
    createLocation(latitude: number, longitude: number, user: User): Promise<void>;
}
