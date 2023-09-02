import { ObjectId } from 'mongodb';
import { Entity, Column, ObjectIdColumn, BaseEntity } from 'typeorm';

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
}
