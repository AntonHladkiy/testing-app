import { Module } from '@nestjs/common';
import { DBService } from './db.service';
import { User, UserSchema } from './schemas/user-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task-schema';
import { Question, QuestionSchema } from './schemas/question-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
