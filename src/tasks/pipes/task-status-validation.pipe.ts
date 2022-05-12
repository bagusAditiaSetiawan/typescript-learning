import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: any) {
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return value;
  }

  private isValidStatus(status) {
    return this.allowedStatus.indexOf(status) !== -1;
  }
}
