import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private task: Task[] = [];

  getAllTask(): Task[] {
    return this.task;
  }

  getTasksWithFilter(filterTaskDto: GetTasksFilterDto) {
    const { search, status } = filterTaskDto;
    const tasks = this.getAllTask();
    if (status) {
      tasks.filter((task) => task.status === status);
      console.log(tasks);
    }
    if (search) {
      tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.task.find((task) => task.id === id);
    if (!task) throw new NotFoundException(`Task with id ${id} is not found`);
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.task.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.task = this.task.filter((task) => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
