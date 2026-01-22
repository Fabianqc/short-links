// import libraries
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { HashingService } from '../common/providers/hashing/hashing.service';
import { User } from '../users/entities/user.entity';
// import services
import { UsersService } from '../users/users.service';
// import dtos
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EventusersessionService } from '../eventusersession/eventusersession.service';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/RefreshToken.dto';

// create service
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private hashingService: HashingService,
        private eventusersessionService: EventusersessionService
    ) { }
    // create token
    async createToken(email: string, id: string) {
        // create payload
        const payload = { email: email, sub: id }
        // return token
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
        }
    }

    // create login with google
    async loginWithGoogle(loginDto: LoginDto) {
        //find user by email
        let user = await this.usersService.findOneByEmail(loginDto.email);
        // If the user is not created, we create it automatically

        if (!user) {
            //if the user is created with google, we create it with the google id and check if the google id is not empty
            if (!loginDto.googleId) {
                throw new UnauthorizedException("Google ID is required");
            }
            user = await this.usersService.createGoogleUser({
                email: loginDto.email,
                username: loginDto.name,
                name: loginDto.name,
                googleId: loginDto.googleId,
            })

        } else if (!user.googleId) {
            let updatedUser = await this.usersService.update(user.email, {
                googleId: loginDto?.googleId?.toString() || undefined,
            })
        }
        //register the event login success
        this.eventusersessionService.createLoginSuccessEvent(user);
        // create and return the token
        return this.createToken(user.email, user.id);
    }

    // create login with password
    async loginWithPassword(loginDto: LoginDto) {
        //find user by email
        let user = await this.usersService.findOneByEmail(loginDto.email);
        // If the user is not created, we create it automatically
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        if (!user.password || !loginDto.password) {
            throw new UnauthorizedException("Password is required");
        }
        //check if the password is correct
        const isPasswordMatched = await this.hashingService.compare(
            loginDto.password,
            user.password.toString(),
        );
        // If the password is not correct, throw an exception
        if (!isPasswordMatched) {
            throw new UnauthorizedException("Invalid password");
        }
        // register the event login success
        this.eventusersessionService.createLoginSuccessEvent(user);
        // create and return the token
        return this.createToken(user.email, user.id);
    }

    // create register with password
    async registerUserWithPassword(registerDto: RegisterDto) {
        //find user by email, if it exists, throw an exception
        let user = await this.usersService.findOneByEmail(registerDto.email)
        if (user) {
            throw new UnauthorizedException("Email is already in use");
        }
        //check if the password is provided
        if (!registerDto.password) {
            throw new UnauthorizedException("Password is required");
        }

        //create user
        user = await this.usersService.createPasswordUser({
            email: registerDto.email,
            username: registerDto.name,
            name: registerDto.name,
            password: registerDto.password,
        })
        //The event is not registered here because it will already be created in the user service
        // create and return the token
        return this.createToken(user.email, user.id);
    }

    // create logout
    async logout(logoutDto: LogoutDto) {
        // register the event logout
        this.eventusersessionService.createLogoutEvent(logoutDto);
    }

    async refreshToken(refreshTokenDto: RefreshTokenDto) {
        try {
            // Verify signature
            const payload = await this.jwtService.verifyAsync(refreshTokenDto.oldToken);

            // Find user from payload (source of truth)
            const user = await this.usersService.findOneByEmail(payload.email);
            if (!user) {
                throw new UnauthorizedException("User not found");
            }

            // Optional: Check if ID matches (payload.sub was used in createToken)
            if (user.id !== payload.sub) {
                throw new UnauthorizedException("Invalid token ownership");
            }

            this.eventusersessionService.createSessionRefreshEvent(user);
            return this.createToken(user.email, user.id);
        } catch (error) {
            throw new UnauthorizedException("Invalid or expired Refresh Token");
        }
    }
}