// import libraries
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import services
import { UsersService } from '../users/users.service';
// import dtos
import { LoginGoogleDto } from './dto/Login-Users.dto';
// create service
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }
    // create login with google
    async loginWithGoogle(loginGoogleDto: LoginGoogleDto) {
        //find user by email
        let user = await this.usersService.findOneByEmail(loginGoogleDto.Email);
        // If the user is not created, we create it automatically
        if (!user) {
            //We call the creategoogleuser service with the necessary data to call the service
            user = await this.usersService.createGoogleUser({
                Email: loginGoogleDto.Email,
                User: loginGoogleDto.name,
                Name: loginGoogleDto.name,
                IdGoogle: loginGoogleDto.googleId,
                //We create a random password for the user to be able to log in with google
                PassHash: 'GOOGLE_AUTH_' + Math.random().toString(36),
            })
        }
        //create payload
        const payload = { email: user.Email }
        // create and return the Jwt token
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}