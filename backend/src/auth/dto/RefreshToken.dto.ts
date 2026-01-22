import { IsNotEmpty, IsEmail } from "class-validator";

export class RefreshTokenDto{
    @IsNotEmpty()
    oldToken: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    id: string;
}