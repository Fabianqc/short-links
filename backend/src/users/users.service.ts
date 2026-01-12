import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingService } from '../common/providers/hashing/hashing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { EventusersessionService } from '../eventusersession/eventusersession.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashingService: HashingService,
    private eventusersessionService: EventusersessionService,
  ) { }

  async createPasswordUser(createUserDto: Partial<User>) {
    const user = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    // if the user already exists, throw an exception
    if (user?.email == createUserDto.email) {
      throw new ConflictException('Email is already in use');
    }
    // if the password is not provided, throw an exception
    if (!createUserDto.password) {
      throw new UnauthorizedException('Password is required');
    }
    // we encrypt the password of the user before sending it to the database
    const hashedPassword = await this.hashingService.hash(
      createUserDto.password,
    );
    createUserDto.password = hashedPassword;
    // we save the user information in the database
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    this.eventusersessionService.createCreatePasswordUserEvent(newUser);
    return newUser;
  }

  findAll() {
    return this.usersRepository.find();
  }
  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email: email
      }
    })
  }

  async createGoogleUser(googleUser: Partial<User>) {
    // we save the user information in the database
    let newUser = this.usersRepository.create(googleUser);
    newUser = await this.usersRepository.save(newUser);
    this.eventusersessionService.createCreateGoogleUserEvent(newUser);
    return newUser;
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(email: string, updateUserDto: Partial<UpdateUserDto>) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.eventusersessionService.createUpdateUserEvent(user);
    return this.usersRepository.update({ email: email }, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
