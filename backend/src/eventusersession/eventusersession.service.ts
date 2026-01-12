import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { LogoutDto } from '../auth/dto/logout.dto';
import { Eventusersession } from './entities/eventusersession.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventusersessionService {
  constructor(
    @InjectRepository(Eventusersession)
    private eventusersessionRepository: Repository<Eventusersession>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createEventUserSession(user: User, event: string) {
    const eventusersession = new Eventusersession();
    eventusersession.userId = user.id;
    eventusersession.event = event;
    eventusersession.eventTime = new Date();
    return this.eventusersessionRepository.save(eventusersession);
  }

  async createLoginSuccessEvent(user: User) {
    return this.createEventUserSession(user, 'LOGIN_SUCCESS');
  }

  async createLoginFailedEvent(user: User) {
    return this.createEventUserSession(user, 'LOGIN_FAILED');
  }

  async createLogoutEvent(logoutDto: LogoutDto) {
    const user = await this.userRepository.findOneBy({ email: logoutDto.email });
    if (!user) {
      throw new Error('User not found');
    }
    return this.createEventUserSession(user, 'LOGOUT');
  }

  async createSessionRefreshEvent(logoutDto: LogoutDto) {
    const user = await this.userRepository.findOneBy({ email: logoutDto.email });
    if (!user) {
      throw new Error('User not found');
    }
    return this.createEventUserSession(user, 'SESSION_REFRESH');
  }

  async createPasswordResetRequestEvent(user: User) {
    return this.createEventUserSession(user, 'PASSWORD_RESET_REQUEST');
  }

  async createPasswordResetSuccessEvent(user: User) {
    return this.createEventUserSession(user, 'PASSWORD_RESET_SUCCESS');
  }

  async createPasswordResetFailedEvent(user: User) {
    return this.createEventUserSession(user, 'PASSWORD_RESET_FAILED');
  }

  async createCreatePasswordUserEvent(user: User) {
    return this.createEventUserSession(user, 'CREATE_PASSWORD_USER');
  }

  async createCreateGoogleUserEvent(user: User) {
    return this.createEventUserSession(user, 'CREATE_GOOGLE_USER');
  }

  async createUpdateUserEvent(user: User) {
    return this.createEventUserSession(user, 'UPDATE_USER');
  }
}
