import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { ObjectId } from 'mongodb';

import { UsersService } from './users.service';
import { UserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: UserDTO) {
    if (!user.name || !user.age) {
      throw new BadRequestException('A user must have a name and age');
    }
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId): Promise<UserDTO> {
    const user = ObjectId.isValid(id) && (await this.usersService.findOne(id));
    if (!user) {
      throw new NotFoundException(`User with ${id} does not exist`);
    }
    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() user: Partial<UserDTO>,
  ): Promise<void> {
    const exists =
      ObjectId.isValid(id) && (await this.usersService.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }

    await this.usersService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId) {
    const exists =
      ObjectId.isValid(id) && (await this.usersService.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }
    return this.usersService.remove(id);
  }
}
