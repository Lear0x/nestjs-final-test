import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([User])],
	controllers: [TaskController],
	providers: [TaskService, UserService],
	exports: [TypeOrmModule],
})
export class TaskModule {}