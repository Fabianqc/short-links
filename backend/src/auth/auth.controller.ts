// import libraries
import { Controller, Body } from "@nestjs/common";
import { Post } from "@nestjs/common";
//import services
import { AuthService } from "./auth.service";
//import dtos
import { LoginGoogleDto } from "./dto/Login-Users.dto";

//create controller
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    //create login with google
    @Post('login')
    async login(@Body() loginDto: LoginGoogleDto){
        return this.authService.loginWithGoogle(loginDto);
    }
}