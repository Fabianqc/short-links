// import libraries
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { HashingService } from '../common/providers/hashing/hashing.service';
// import services
import { UsersService } from '../users/users.service';
// import dtos
import { LoginUsersDto } from './dto/Login-Users.dto';
// create service
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private hashingService: HashingService
    ) { }
    // create token
    async createToken(Email: string, idUsers: string) {
        // create payload
        const payload = { email: Email, id: idUsers }
        // return token
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    // create login with google
    async loginWithGoogle(loginDto: LoginUsersDto) {
        //find user by email
        let user = await this.usersService.findOneByEmail(loginDto.Email);
        // If the user is not created, we create it automatically

        if (!user) {
            //if the user is created with google, we create it with the google id and check if the google id is not empty
            if (!loginDto.googleId) {
                throw new UnauthorizedException("Google ID is required");
            }
            user = await this.usersService.createGoogleUser({
                Email: loginDto.Email,
                User: loginDto.name,
                Name: loginDto.name,
                IdGoogle: loginDto.googleId,
            })

        }else if(!user.IdGoogle){
            let updatedUser = await this.usersService.update(user.Email, {
                IdGoogle: loginDto?.googleId?.toString() || undefined,
            })
        }
        // create and return the token
        return this.createToken(user.Email, user.idUsers);
    }

    // create login with password
    async loginWithPassword(loginDto: LoginUsersDto) {
        //find user by email
        let user = await this.usersService.findOneByEmail(loginDto.Email);
        // If the user is not created, we create it automatically
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        if (!user.PassHash || !loginDto.password) {
            throw new UnauthorizedException("Password is required");
        }
        //check if the password is correct
        const isPasswordMatched = await this.hashingService.compare(
            loginDto.password,
            user.PassHash.toString(),
        );
        // If the password is not correct, throw an exception
        if (!isPasswordMatched) {
            throw new UnauthorizedException("Invalid password");
        }
        // create and return the token
        return this.createToken(user.Email, user.idUsers);
    }

    // create register with password
    async registerUserWithPassword(loginDto: LoginUsersDto) {
        //find user by email, if it exists, throw an exception
        let user = await this.usersService.findOneByEmail(loginDto.Email)
        if (user) {
            throw new UnauthorizedException("Email is already in use");
        }
        //check if the password is provided
        if (!loginDto.password) {
            throw new UnauthorizedException("Password is required");
        }

        //create user
        user = await this.usersService.createPasswordUser({
            Email: loginDto.Email,
            User: loginDto.name,
            Name: loginDto.name,
            PassHash: loginDto.password,
        })
        // create and return the token
        return this.createToken(user.Email, user.idUsers);
    }
}