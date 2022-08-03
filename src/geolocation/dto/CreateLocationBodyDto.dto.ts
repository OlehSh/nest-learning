import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { GEOLOCATION_TYPE } from '../geoloaction.constants';

export class CreateLocationBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([
    GEOLOCATION_TYPE.POINT,
    GEOLOCATION_TYPE.LINESTRING,
    GEOLOCATION_TYPE.POLYGON,
  ])
  locationType: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  coordinates: string[];
}
