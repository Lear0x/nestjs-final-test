import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 255 })
	name: string;

	@Column({ type: 'int', nullable: true })
	priority: number;

	@Exclude()
	@ManyToOne(() => User, (user) => user.task, { eager: false })
	user: User;

	@Column({ name: 'user_id' })
	userId: number;
}