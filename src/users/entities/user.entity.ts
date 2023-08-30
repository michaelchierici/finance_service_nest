import { ObjectId } from 'mongodb';
import { Card } from 'src/cards/entities/card.entity';
import { Entity, Column, ObjectIdColumn, BaseEntity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  job: string;

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];
}
