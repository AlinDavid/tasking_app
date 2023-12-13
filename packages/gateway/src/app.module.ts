import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
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
  ],
})
export class AppModule {}
