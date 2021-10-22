import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(2, 100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  password: string;
}
