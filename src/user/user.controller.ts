import { Controller, Get, Post, Param, Body, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.addUser(user.email);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
		if (id.length !== 36) {
            throw new BadRequestException(`Invalid user ID format`);
        }
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        await this.userService.deleteUser(id);
        return;
    }
}
