import { IsString, MinLength, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer'

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Your UserName is too short' })
  User: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Your Password is too short' })
  PassHash?: string;

  @IsString()
  @IsOptional()
  IdGoogle?: string;

  @IsEmail({}, { message: 'this is not a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @Transform(({ value }) => value.toLowerCase().trim())
  Email: string;

  @IsString()
  @MinLength(3, { message: 'Your Name is too short' })
  @IsOptional()
  Name: string;

}
