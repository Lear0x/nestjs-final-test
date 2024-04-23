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

	//TODO ajouter max et min (1 et 5)
    @Column({ type: 'int', nullable: true })
    priority: number;

    @ManyToOne(() => User, user => user.tasks)
    user: User;
}
