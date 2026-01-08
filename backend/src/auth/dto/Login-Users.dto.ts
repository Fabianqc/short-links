// dto for de login with google
import { IsEmail, IsString, IsNotEmpty } from "class-validator";

// create a class for the login with google
export class LoginGoogleDto {

    //this is the email of the user
    @IsEmail()
    @IsNotEmpty()
    Email: string;

    //this value is not empty and it is a string
    @IsString()
    @IsNotEmpty()
    name: string;

    //this value is not empty and it is a string
    @IsString()
    @IsNotEmpty()
    googleId: string;
}