import { IsIn, IsNotEmpty, IsArray, IsString, Length } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['point', 'linestring', 'polygon'])
  locationType: string;

  @IsArray()
  @IsNotEmpty()
  coordinates: string[];
}
