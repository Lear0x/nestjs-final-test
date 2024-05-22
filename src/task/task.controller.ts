import { Controller, Get, Post, Param, Body, Delete, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { ok } from 'assert';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

	@Post()
	async addTask(@Body() task: any): Promise<void> {
		const { name, userId, priority } = task;
		
		if (!name || !userId || !priority || priority < 1) {
			throw new BadRequestException(`Error adding task: missing required fields`);
		}
	
		await this.taskService.addTask(name, userId, priority);
		
    }

    @Get(':name')
    async getTaskByName(@Param('name') name: string): Promise<Task> {
        const task = await this.taskService.getTaskByName(name);
        if (!task) {
            throw new NotFoundException(`Task with name ${name} not found`);
        }
        return task;
    }

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string): Promise<Task[]> {
        if (userId.length !== 36) {
            throw new BadRequestException('Invalid user ID format');
        }
        return this.taskService.getUserTasks(userId);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<void> {
        try {
            await this.taskService.deleteTask(id);
        } catch (error) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
    }
}
