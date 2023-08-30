import { ObjectId } from 'mongodb';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ObjectIdColumn, BaseEntity, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.cards)
  user: User[];
}
