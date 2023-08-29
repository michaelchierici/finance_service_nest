import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { ObjectId } from 'mongodb';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
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
  async findOne(@Param('id') id): Promise<User> {
    const user = ObjectId.isValid(id) && (await this.usersService.findOne(id));
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id') id, @Body() user: Partial<User>): Promise<void> {
    const exists =
      ObjectId.isValid(id) && (await this.usersService.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }

    await this.usersService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    const exists =
      ObjectId.isValid(id) && (await this.usersService.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }
    return this.usersService.remove(id);
  }
}
