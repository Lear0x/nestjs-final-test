import { Controller, Get, Post, Param, Body, Delete, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { VerifMailService } from '../verifMail.service';
import { User } from './user.entity';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService, private readonly verifMailService: VerifMailService) {}

    @Post()
    async addUser(@Body() user: User): Promise<void> {

		if (!user.email || !this.verifMailService.isValidEmail(user.email)) {
			throw new BadRequestException(`Invalid user email`);
		}
		const userResponse = await this.userService.addUser(user.email);
		if(userResponse === null) {
			throw new ConflictException(`User with email ${user.email} already exists`);
		}
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
    }

	@Post('reset-data')
	async resetData(): Promise<void> {
		await this.userService.resetData();
	}
}
