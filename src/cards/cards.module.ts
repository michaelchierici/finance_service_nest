import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Card } from './entities/card.entity';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardsService],
  controllers: [CardsController],
  exports: [TypeOrmModule],
})
export class CardsModule {}
