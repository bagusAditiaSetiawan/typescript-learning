import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  async getTasks(filterTaskDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) throw new NotFoundException(`Task with id ${id} is not found`);
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: number): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) throw new NotFoundException(`Task with id ${id} is not found`);
    await this.tasksRepository.delete(id);
    return found;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) throw new NotFoundException(`Task with id ${id} is not found`);
    found.status = status;
    await found.save();
    return found;
  }
}
