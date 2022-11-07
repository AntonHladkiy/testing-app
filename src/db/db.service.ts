import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user-schema';
import { UserDto } from '../types/dto/user.type';
import { Task } from './schemas/task-schema';
import * as bcrypt from 'bcrypt';
import { Question } from './schemas/question-schema';

@Injectable()
export class DBService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
    @InjectModel(Question.name)
    private readonly questionModel: Model<Question>,
  ) {}

  async onModuleInit() {
    try {
      const res = await this.userModel.find().exec(); // this method returns user data exist in database (if any)
      if (res.length == 0) {
        const questions = await this.createQuestions(10);
        const task1 = await this.createTask(
          'Task1',
          'Short description for task1',
          questions.slice(0, 5),
        );
        const task2 = await this.createTask(
          'Task2',
          'Short description for task2',
          questions.slice(5, 10),
        );
        await this.createUser(
          {
            username: 'user1',
            password: await bcrypt.hash('pass1', 10),
          },
          task1,
        );
        await this.createUser(
          {
            username: 'user2',
            password: await bcrypt.hash('pass2', 10),
          },
          task2,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async createQuestions(numberOfQuestions: number) {
    const result = [];
    for (let i = 0; i < numberOfQuestions; i++) {
      const createdData = new this.questionModel({
        question: 'Question' + i,
        answers: ['1', '2', '3', '4'],
        answerIndex: Math.floor(Math.random() * 4),
      });
      result.push(await createdData.save());
    }
    return result;
  }

  async createTask(title: string, description: string, questions: Question[]) {
    const createdData = new this.taskModel({
      title: title,
      description: description,
      questions: questions,
    });
    return await createdData.save();
  }

  async createUser(user: UserDto, task: Task) {
    const createdData = new this.userModel({ ...user, tasks: [task] });
    return await createdData.save();
  }

  async getById(id: number) {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    throw new HttpException('Wrong user id', HttpStatus.NOT_FOUND);
  }

  async getByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this username does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getTasksByUserId(id: number) {
    const user = await this.userModel.findById(id).populate('tasks');
    if (user) {
      return user.tasks;
    }
    throw new HttpException('Wrong user id', HttpStatus.NOT_FOUND);
  }

  async getTasksById(id: number) {
    const task = await this.taskModel.findById(id).populate('questions');
    if (task) {
      return task;
    }
    throw new HttpException('Wrong task id', HttpStatus.NOT_FOUND);
  }
}
