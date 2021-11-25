import {Column, Entity, PrimaryGeneratedColumn,CreateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity('notes')
export class Note {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @JoinColumn({
        name: 'userId' 
    })
    @ManyToOne(() => User, (user) => user.notes)
    userId: User
}
