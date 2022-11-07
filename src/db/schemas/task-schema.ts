import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ strict: true, timestamps: false, autoCreate: true, autoIndex: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Question' }])
  questions: Types.ObjectId[];

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'User' }])
  users: Types.ObjectId[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
