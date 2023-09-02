import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Card } from './entities/card.entity';
import { CardDTO } from './dto/create-card.dto';
import { UpdateCardDTO } from './dto/update-card.dto';

import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: MongoRepository<Card>,
  ) {}

  async create(createCardDTO: CardDTO): Promise<CardDTO> {
    return await this.cardsRepository.save(createCardDTO);
  }

  async findAll(): Promise<Card[]> {
    const users = await this.cardsRepository.find();
    return users;
  }

  async findOne(id: ObjectId): Promise<Card> {
    const user = await this.cardsRepository.findOne({
      where: {
        _id: new ObjectId(id),
      },
    });
    return user;
  }

  async update(id: ObjectId, updateCardDTO: UpdateCardDTO) {
    const user = await this.cardsRepository.update(id, updateCardDTO);
    return user;
  }

  async remove(id: ObjectId) {
    const user = await this.cardsRepository.delete(id);
    return user;
  }
}
