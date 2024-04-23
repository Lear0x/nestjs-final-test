import { IsString, Length, IsEmail, IsBoolean, IsNumber, IsUUID } from 'class-validator';
import { User } from 'src/user/user.entity';

export class AddTaskDto {

	
	@IsString()
	@Length(1, 100)
	name: string;

	@IsNumber()
	@Length(1, 5)
	priority: number;

	@IsUUID()
	@IsString()
	userId : string
}