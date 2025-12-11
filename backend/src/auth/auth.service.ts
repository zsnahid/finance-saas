import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FindUserDto } from 'src/users/findUser.dto';
import { AuthUserDto } from 'src/users/authUser.dto';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<UserEntity> | null> {
    const user = await this.usersService.findOne(username);
    const isMatch = user && (await bcrypt.compare(pass, user.password));
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(userDto: AuthUserDto): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findOne(userDto.username);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const user = await this.usersService.createUser(userDto);
    return this.login({ username: user.username, id: user.id });
  }

  async login(user: FindUserDto): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
