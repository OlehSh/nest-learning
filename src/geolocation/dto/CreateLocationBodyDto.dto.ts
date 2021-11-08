import { IsIn, IsNotEmpty, IsArray, IsString, Length } from 'class-validator';
import { GEOLOCATION_TYPE } from '../geoloaction.constants';

export class CreateLocationBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([GEOLOCATION_TYPE])
  locationType: string;

  @IsArray()
  @IsNotEmpty()
  coordinates: string[];
}
