// dto for de login with google
import { IsEmail, IsString, IsNotEmpty, IsOptional } from "class-validator";

// create a class for the login with google
export class LoginUsersDto {

    //this is the email of the user
    @IsEmail({},{message: 'Email is not valid'})
    @IsNotEmpty({message: 'Email is required'})
    Email: string;

    //this value is not empty and it is a string
    @IsString({message: 'Name is not valid'})
    @IsOptional()
    name?: string;

    //this value is not empty and it is a string
    @IsString({message: 'Google ID is not valid'})
    @IsOptional()
    googleId?: string;

    //this value is not empty and it is a string
    @IsString({message: 'Password is not valid'})
    @IsOptional()
    password?: string;
}