import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();

    const passwordHashed = await bcrypt.hash(createUserDto.password, salt);

    const user = {
      ...createUserDto,
      id: this.users.length + 1,
      password: passwordHashed,
    };
    this.users.push(user);

    return { ...createUserDto, id: 1 };
  }

  getUsers(): Promise<User[]> {
    return this.users;
  }
}
