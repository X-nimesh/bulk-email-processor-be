import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findOnebyEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }
  async findOneUsersByID(id: number): Promise<any | undefined> {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }
  async createUser(user: RegisterUserDTO) {
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, user: RegisterUserDTO) {
    return await this.userRepository.update(id, user);
  }
}
