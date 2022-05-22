import { Entity, PrimaryGeneratedColumn, Column , Unique, CreateDateColumn , UpdateDateColumn, JoinColumn, OneToOne, OneToMany, ManyToOne} from "typeorm"
import { Length, IsNotEmpty , IsEmail} from "class-validator";
import * as bcrypt from "bcryptjs";
import { UserRoles } from "./UserRoles";
import { Book } from "./Book";
import {User} from './User';
@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rating:number

    @Column()
    comment:string

    @ManyToOne(() => Book ,(book) => book.reviews)
    book:Book

    @Column()
    user: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
