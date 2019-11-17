import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationRepository } from './repositories/location.repository';
import { LocationDto } from './dto/location.dto';
import { User } from '../auth/entities/user.entity';
import { Location } from './entities/location.entity';

@Injectable()
export class LocatorService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: LocationRepository,
  ) {}

  async updateLocation(locationDto: LocationDto, user: User): Promise<void> {
    const { latitude, longitude } = locationDto;
    await this.locationRepository.updateLocation(latitude, longitude, user);
    return;
  }

  async createLocation(latitude: number, longitude: number, user: User): Promise<void> {
    await this.locationRepository.createLocation(latitude, longitude, user);
    return;
  }

  async getAllLocations(): Promise<Location[]> {
    return await this.locationRepository.getAllLocations();
  }
}
