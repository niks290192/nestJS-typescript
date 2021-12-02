import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoggerService } from 'src/shared/logger.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
    private readonly logger: LoggerService = new LoggerService(
        UsersService.name,
    );

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user: ${JSON.stringify(createUserDto)}`);
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    this.logger.log(`Fetching user with id: ${id}`);
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    this.logger.log(`Removing user with id: ${id}`);
    if (user) {
      await user.destroy();
    }
  }
}