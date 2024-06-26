import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async addUser(email: string): Promise<void> {

		const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException(`User with email ${email} already exists`);
        }

        const newUser = this.userRepository.create({ email });
        await this.userRepository.save(newUser);
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }
	
	async getUser(email: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { email } });
		return user;
	}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.getUserById(id);
        await this.userRepository.remove(user);
    }

	async resetData(): Promise<void> {
		await this.userRepository.delete({});
	}
}
