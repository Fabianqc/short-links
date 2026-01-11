// import libraries
import { Controller, Body } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
//import services
import { AuthService } from "./auth.service";
//import dtos
import { LoginUsersDto } from "./dto/Login-Users.dto";

//create controller
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    //create login with google
    @Post('login')
    async login(@Body() loginDto: LoginUsersDto){
        //check if googleId or password is provided
        if(loginDto.googleId){
            return this.authService.loginWithGoogle(loginDto);
        }else if(loginDto.password){
            return this.authService.loginWithPassword(loginDto);
        }else{
            throw new UnauthorizedException('Google ID or password is required');
        }
    }
    //create register with password
    @Post('register')
    async register(@Body() registerDto: LoginUsersDto){
        return this.authService.registerUserWithPassword(registerDto);
    }
}