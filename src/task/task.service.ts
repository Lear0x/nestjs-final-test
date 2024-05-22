import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
	private readonly logger = new Logger(TaskService.name);
	constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
		private readonly userService: UserService,
    ) {}

    async addTask(name: string, id: string, priority: number): Promise<void> {
		const user = await this.userService.getUserById(id);
		if(!user) {
			return null;
		}
		const task = this.taskRepository.create({ name, user, priority });
		await this.taskRepository.save(task);
    }

    async getTaskByName(name: string): Promise<Task> {
        const result = await this.taskRepository.findOne({ where: { name } });
		return result;
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        try {
            const tasks = await this.taskRepository.find({ where: { userId } });
            this.logger.debug(`Fetched ${tasks.length} tasks for userId ${userId}`);
            return tasks;
        } catch (error) {
            this.logger.error(`Failed to fetch tasks for userId ${userId}`, error.stack);
            throw error;
        }
	}
	
    async resetData(): Promise<void> {
        await this.taskRepository.delete({});
    }

	async deleteTask(id: string): Promise<void> {
		const task = await this.taskRepository.findOne({ where: { id } });
		if (!task) {
			throw new NotImplementedException(`Task with id ${id} not found`);
		}
		await this.taskRepository.remove(task);
	}
}
