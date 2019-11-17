import { IsNotEmpty } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;
}
