import { BaseEntity } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
export declare class Location extends BaseEntity {
    id: number;
    user: User;
    userId: number;
    latitude: number;
    longitude: number;
    lastUpdated: Date;
}
