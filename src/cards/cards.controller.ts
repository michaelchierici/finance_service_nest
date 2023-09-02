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
import { CardDTO } from './dto/create-card.dto';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() card: CardDTO) {
    if (!card.nickname) {
      throw new BadRequestException('A user must have nickname');
    }
    return this.cardsService.create(card);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId): Promise<CardDTO> {
    const card = ObjectId.isValid(id) && (await this.cardsService.findOne(id));
    if (!card) {
      throw new NotFoundException('Card not found!');
    }
    return card;
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() card: Partial<CardDTO>,
  ): Promise<void> {
    const exists =
      ObjectId.isValid(id) && (await this.cardsService.findOne(id));
    if (!exists) {
      throw new NotFoundException('Card not found!');
    }
    const formatCardToUpdate = {
      nickname: card.nickname,
    };

    await this.cardsService.update(id, formatCardToUpdate);
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId) {
    const card = ObjectId.isValid(id) && (await this.cardsService.findOne(id));

    if (!card) {
      throw new NotFoundException();
    }
    return this.cardsService.remove(id);
  }
}
