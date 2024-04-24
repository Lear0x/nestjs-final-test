import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
	constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
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
		console.log("name: ", name);
        const result = await this.taskRepository.findOne({ where: { name } });
		console.log("result: ", result);
		return result;
    }

	async getUserTasks(id: string): Promise<Task[]> {
        return await this.taskRepository.find({ where: { id } });
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
