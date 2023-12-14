import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './services/guards/authorization.guard';
import { TasksController } from './tasks.controller';

@Module({
  imports: [],
  controllers: [UserController, TasksController],
  providers: [
    ConfigService,
    {
      provide: 'USERS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const usersServiceOptions = configService.get('usersService');
        return ClientProxyFactory.create(usersServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = configService.get('authService');
        return ClientProxyFactory.create(authServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'TASKS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tasksServiceOptions = configService.get('tasksService');
        return ClientProxyFactory.create(tasksServiceOptions);
      },
      inject: [ConfigService],
    },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
