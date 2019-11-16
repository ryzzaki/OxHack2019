import { IsNotEmpty } from 'class-validator';

export class OriginDto {
  @IsNotEmpty()
  originLat: number;

  @IsNotEmpty()
  originLong: number;
}