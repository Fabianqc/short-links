import { IsString, MinLength, IsEmail, IsDateString } from 'class-validator';
import { Transform} from 'class-transformer'

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Your UserName is too short' })
  User: string;

  @IsString()
  @MinLength(8, { message: 'Your Password is too short' })
  PassHash: string;

  @IsString()
  IdGoogle: string;

  @IsEmail({}, { message: 'this is not a valid email' })
  @Transform(({value})=> value.toLowerCase().trim())
  Email: string;

  @IsString()
  @MinLength(3, { message: 'Your Name is too short' })
  Name: string;

  @IsDateString()
  Create_at: string;
}
