import { Entity, PrimaryGeneratedColumn, Column , Unique, CreateDateColumn , UpdateDateColumn, JoinColumn, OneToOne , ManyToOne, ManyToMany, OneToMany} from "typeorm"
import { Length, IsNotEmpty , IsEmail} from "class-validator";
import * as bcrypt from "bcryptjs";
import { UserRoles } from "./UserRoles";
import { User } from "./User";
import {BookGenre} from './BookGenre';
import { OrderDetails } from "./OrderDetails";
import { Review } from "./Review";

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string

    @Column()
    desc : string

    @Column()
    price:number

    @Column()
    imgurl:string

    //@Column("text",{array:true })
    //type:string[]


    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=> User , (user) => user.books)
    user: User

    @ManyToOne(()=>BookGenre)
    genre: BookGenre

    @OneToMany(()=>Review , (reviews) => reviews.book ,{
        eager:true
    })
    @JoinColumn()
    reviews: Review
    
}
