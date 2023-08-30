import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
  ) {}

  async create(createUserDto: UserDTO): Promise<UserDTO> {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: ObjectId): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        _id: new ObjectId(id),
      },
    });
    return user;
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDTO) {
    const user = await this.usersRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: ObjectId) {
    const user = await this.usersRepository.delete(id);
    return user;
  }
}
