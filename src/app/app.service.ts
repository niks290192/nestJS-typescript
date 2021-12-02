import { Injectable } from '@nestjs/common';
import { LoggerService } from '.././shared/logger.service';


@Injectable()
export class AppService {
  private readonly logger: LoggerService = new LoggerService(
    AppService.name
  );

  getHello(): string {
    this.logger.log('Hello world!');
    this.logger.error("This is an error");
    return 'Hello World!';
  }
}
