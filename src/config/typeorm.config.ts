import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/tasks.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'secret',
  database: 'management_task',
  entities: [Task],
  synchronize: true,
};
