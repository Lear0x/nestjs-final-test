import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    name: string;

    @Column({ default: false })
    completed: boolean;

    @Column({ type: 'int', nullable: true })
    priority: number;

    @ManyToOne(() => User, user => user.tasks)
    user: User;
}
