import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { EqualToField } from '../../decorators/validate-decoreators/EqualToField';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(2, 100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  password: string;

  @IsNotEmpty()
  @IsString()
  @EqualToField('password')
  repeatPassword: string;
}
