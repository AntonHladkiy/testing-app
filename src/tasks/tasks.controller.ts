import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import JwtAuthenticationGuard from '../users/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async getTasks(@Req() request) {
    return this.tasksService.getAllTasks(request.user._id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async getTask(@Param() params) {
    return this.tasksService.getTaskById(params.id);
  }
}
