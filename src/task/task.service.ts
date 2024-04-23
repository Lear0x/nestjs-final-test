import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
	constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async addTask(name: string, id: string, priority: number): Promise<void> {
        const task = new Task();
        task.name = name;
        task.id = id;
        task.priority = priority;

        await this.taskRepository.save(task);
    }

    async getTaskByName(name: string): Promise<Task> {
        return await this.taskRepository.findOne({ where: { name } });
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
