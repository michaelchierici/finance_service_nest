import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  job: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
