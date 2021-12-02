import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { LoggerService } from './logger.service';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    private readonly logger: LoggerService = new LoggerService(
        ValidationPipe.name,
    );

    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;

        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            this.logger.log(`Validation failed : ${errors}`);

            throw new HttpException(
                `Validation failed : ${this.formatErrors(errors)}`,
                HttpStatus.BAD_REQUEST,
            );
        }
        return value;
    }

    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private formatErrors(errors: any[]): string {
        return errors
            .map(error => {
                for (const property of Object.keys(error.constraints)) {
                    return error.constraints[property];
                }
            })
            .join(', ');
    }
}
