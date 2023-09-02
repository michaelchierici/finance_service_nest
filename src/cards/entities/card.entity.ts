import { ObjectId } from 'mongodb';
import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

@Entity()
export class Card extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  nickname: string;

  @Column()
  flag: string;

  @Column()
  number: number;

  @Column()
  limit: number;
}
