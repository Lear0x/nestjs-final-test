import { IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

	@IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
