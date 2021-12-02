import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENVIRONMENT } from '../config/environment.config';
import { LoggerService } from '../shared/logger.service';
import { UsersModule } from '../users/users.module';

import * as config from 'config';

const dbConfig = config.get('db');

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: dbConfig.dialect,
      host: dbConfig.host,
      port: dbConfig.port,
      username:  dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      logging: false,
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger: LoggerService = new LoggerService(AppModule.name);
  constructor() {
    this.logger.log(`Environment: ${ENVIRONMENT}`);
  }
}
