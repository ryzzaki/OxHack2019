import { IsNotEmpty, IsString } from 'class-validator';

export class OriginDto {
  @IsNotEmpty()
  originLat: number;

  @IsNotEmpty()
  originLong: number;

  @IsNotEmpty()
  ambulanceEta: number;

  @IsString()
  description: string;
}
