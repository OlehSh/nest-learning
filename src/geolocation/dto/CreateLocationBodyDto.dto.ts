import { ArrayNotEmpty, IsArray, IsIn, IsNotEmpty, IsString, Length } from 'class-validator';
import { GEOLOCATION_TYPE } from '../geoloaction.constants';
import { CoordinatesMatchWithType } from '../../decorators/validate-decoreators/CoordinateseMatchWithType';

export class CreateLocationBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([GEOLOCATION_TYPE.POINT, GEOLOCATION_TYPE.LINESTRING, GEOLOCATION_TYPE.POLYGON])
  locationType: GEOLOCATION_TYPE;

  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @CoordinatesMatchWithType('locationType')
  coordinates:
    | [string | number, string | number]
    | [string | number, string | number][]
    | [string | number, string | number][][];
}
