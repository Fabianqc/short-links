// import libraries
import { Controller, Body, UseGuards } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
//import services
import { AuthService } from "./auth.service";
//import dtos
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
//import entities
import { LogoutDto } from "./dto/logout.dto";
import { RefreshTokenDto } from "./dto/RefreshToken.dto";
//import guards
import { JwtAuthGuard } from "../common/guards/api-key/jwt-auth.guard";
//import decorators
import { ActiveUser } from "../common/decorators/active-user.decorator";
//create controller


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    //create login with google
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        //check if googleId or password is provided
        if (loginDto.googleId) {
            return this.authService.loginWithGoogle(loginDto);
        } else if (loginDto.password) {
            return this.authService.loginWithPassword(loginDto);
        } else {
            throw new UnauthorizedException('Google ID or password is required');
        }
    }
    //create register with password
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        // Let's assume I will update AuthService to take LoginDto | RegisterDto or similar.
        // For now, I'll pass registerDto as any because I can't change all files at once.
        // BUT I SHOULD change AuthService signature to `RegisterDto`.
        return this.authService.registerUserWithPassword(registerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@ActiveUser() logoutDto: LogoutDto) {
        this.authService.logout(logoutDto)
    }

    @Post('refresh')
    async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto);
    }
}