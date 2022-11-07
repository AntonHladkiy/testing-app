import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ strict: true, timestamps: false, autoCreate: true, autoIndex: true })
export class User extends Document {
  @Prop({ required: false, unique: true })
  username: string;

  @Prop({ required: false })
  password: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Task' }])
  tasks: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
