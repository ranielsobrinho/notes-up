import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";
import { Note } from "./Note";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @OneToMany(() => Note, (note) => note.userId, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    notes: Note[]
}
