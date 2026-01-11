import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingService } from '../common/providers/hashing/hashing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashingService: HashingService,
  ) { }

  async createPasswordUser(createUserDto: Partial<User>) {
    const user = await this.usersRepository.findOne({
      where: {
        Email: createUserDto.Email,
      },
    });

    // if the user already exists, throw an exception
    if (user?.Email == createUserDto.Email) {
      throw new ConflictException('Email is already in use');
    }
    // if the password is not provided, throw an exception
    if (!createUserDto.PassHash) {
      throw new UnauthorizedException('Password is required');
    }
    // we encrypt the password of the user before sending it to the database
    const hashedPassword = await this.hashingService.hash(
      createUserDto.PassHash,
    );
    createUserDto.PassHash = hashedPassword;
    // we save the user information in the database
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }
  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        Email: email
      }
    })
  }

  async createGoogleUser(googleUser: Partial<User>) {
    // we save the user information in the database
    const newUser = this.usersRepository.create(googleUser);
    return await this.usersRepository.save(newUser);
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(email: string, updateUserDto: Partial<UpdateUserDto>) {
    const user = await this.usersRepository.findOne({
      where: {
        Email: email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.update({ Email: email }, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
