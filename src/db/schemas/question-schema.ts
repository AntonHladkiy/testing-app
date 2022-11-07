import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ strict: true, timestamps: false, autoCreate: true, autoIndex: true })
export class Question extends Document {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answers: string[];

  @Prop({ required: true })
  answerIndex: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
