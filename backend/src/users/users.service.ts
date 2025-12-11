import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { AuthUserDto } from './authUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: AuthUserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    const newUser = this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async findOne(username: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      return null;
    }
    return user;
  }
}
