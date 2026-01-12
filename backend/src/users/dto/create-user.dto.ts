import { IsString, MinLength, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer'

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Your UserName is too short' })
  username: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Your Password is too short' })
  password?: string;

  @IsString()
  @IsOptional()
  googleId?: string;

  @IsEmail({}, { message: 'this is not a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @IsString()
  @MinLength(3, { message: 'Your Name is too short' })
  @IsOptional()
  name: string;

}
