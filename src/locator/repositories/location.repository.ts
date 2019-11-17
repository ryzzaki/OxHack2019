import { EntityRepository, Repository } from 'typeorm';
import { Location } from '../entities/location.entity';
import { User } from '../../auth/entities/user.entity';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  async createLocation(latitude: number, longitude: number, user: User): Promise<void> {
    const location = new Location();
    location.latitude = latitude;
    location.longitude = longitude;
    location.user = user;
    location.userId = user.id;
    await this.save(location);
  }

  async updateLocation(latitude: number, longitude: number, user: User): Promise<void> {
    const location = await this.findOne({ user });
    location.latitude = latitude;
    location.longitude = longitude;
    await this.update(location.id, location);
  }

  async getAllLocations(): Promise<Location[]> {
    return await this.find();
  }
}
