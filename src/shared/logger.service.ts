import { Injectable } from '@nestjs/common';

import * as winston from 'winston';

const { combine, timestamp, json } = winston.format;

@Injectable()
export class LoggerService {
    private readonly logger = winston.createLogger({
        format: combine(timestamp(), json()),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
            }),
            new winston.transports.File({ filename: 'logs/combined.log' }),
        ],
    });

    constructor(private label: string) {}

    log(message: any, context?: string) {
        this.logger.log('info', message, { label: this.label, context });
    }
    error(message: any, trace?: string, context?: string) {
        this.logger.error(message, { label: this.label, context });
    }
    warn(message: any, context?: string) {
        this.logger.warn(message, { label: this.label, context });
    }
    debug?(message: any, context?: string) {
        this.logger.debug(message, { label: this.label, context });
    }
    verbose?(message: any, context?: string) {
        this.logger.verbose(message, { label: this.label, context });
    }
}
