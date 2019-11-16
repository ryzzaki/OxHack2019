import { Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { User } from '../../auth/entities/user.entity';
export declare class LocationRepository extends Repository<Location> {
    createLocation(latitude: number, longitude: number, user: User): Promise<void>;
    updateLocation(latitude: number, longitude: number, user: User): Promise<void>;
}
