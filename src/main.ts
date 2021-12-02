import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { LoggerService } from './shared/logger.service';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(`Main`)
  });
  const serverConfig = config.get('server');
  const PORT = process.env.PORT || serverConfig.port;
  await app.listen(PORT);
}
bootstrap();


