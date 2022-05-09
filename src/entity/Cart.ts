import { Entity, PrimaryGeneratedColumn, Column , Unique, CreateDateColumn , UpdateDateColumn, JoinColumn, OneToOne, OneToMany, ManyToOne} from "typeorm"
import { Length, IsNotEmpty , IsEmail} from "class-validator";
import * as bcrypt from "bcryptjs";
import { UserRoles } from "./UserRoles";
import { Book } from "./Book";
import {User} from './User';
@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Book )
    @JoinColumn()
    book_id:Book

    @ManyToOne(() => User ,(user_id)=>user_id.cart_books)
    @JoinColumn()
    user_id: User;

    @Column()
    quantity: number

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
