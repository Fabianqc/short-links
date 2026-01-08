import { Injectable, ConflictException } from '@nestjs/common';
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
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        Email: createUserDto.Email,
      },
    });
    // if the user already exists, throw an exception
    if (user?.Email == createUserDto.Email) {
      throw new ConflictException('Email already exists');
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
  async findOneByEmail(email: string){
    return this.usersRepository.findOne({
      where:{
        Email: email
      }
    })
  }

  async createGoogleUser(googleUser: Partial<User>){
    // Manually generate UUID to ensure it's not null
    const newUser = this.usersRepository.create({
      ...googleUser,
      idUsers: randomUUID()
    });
    return await this.usersRepository.save(newUser);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
