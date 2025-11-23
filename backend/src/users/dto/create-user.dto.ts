import {
  IsString,
  MinLength,
  IsEmail,
  IsHash,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Your UserName is too short' })
  User: string;

  @IsString()
  PassHash: string;

  @IsString()
  IdGoogle: string;

  @IsEmail({}, { message: 'this is not a valid email' })
  Email: string;

  @IsString()
  @MinLength(3, { message: 'Your Name is too short' })
  Name: string;

  @IsDateString()
  Create_at: string;
}
