import { Injectable } from '@nestjs/common';
import { DBService } from '../db/db.service';

@Injectable()
export class TasksService {
  constructor(private readonly dbService: DBService) {}

  async getAllTasks(userId: number) {
    return await this.dbService.getTasksByUserId(userId);
  }

  async getTaskById(id: number) {
    return await this.dbService.getTasksById(id);
  }
}
