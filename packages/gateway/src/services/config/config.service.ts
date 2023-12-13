import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.authService = {
      options: {
        port: process.env.AUTH_SERVICE_PORT,
        host: process.env.AUTH_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.usersService = {
      options: {
        port: process.env.USERS_SERVICE_PORT,
        host: process.env.USERS_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.tasksService = {
      options: {
        port: process.env.TASK_SERVICE_PORT,
        host: process.env.TASK_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
