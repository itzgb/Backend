import { Entity, PrimaryGeneratedColumn, Column , Unique, CreateDateColumn , UpdateDateColumn, JoinColumn, OneToOne, OneToMany, ManyToOne, ManyToMany} from "typeorm"
import { Length, IsNotEmpty , IsEmail} from "class-validator";
import * as bcrypt from "bcryptjs";
import { UserRoles } from "./UserRoles";
import { Book } from "./Book";
import {User} from './User';
import {Order} from './Order';
@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Order ,(order_id)=>order_id.addr_id)
    order_id: Order;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    line1: string;

    @Column()
    line2: string;

    @Column()
    postal_code: string;

    @Column()
    state: string;


    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
