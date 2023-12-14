import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TaskService } from './services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoServiceConfig } from './services/config/mongo';
import { TaskSchema } from './models/task';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoServiceConfig,
    }),
    MongooseModule.forFeature([
      {
        name: 'Task',
        schema: TaskSchema,
        collection: 'tasks',
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
