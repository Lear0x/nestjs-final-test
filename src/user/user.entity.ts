import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

	@Column({ length: 100 })
	email: string

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];
}
