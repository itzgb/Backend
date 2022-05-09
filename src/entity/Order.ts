import { Entity, PrimaryGeneratedColumn, Column , Unique, CreateDateColumn , UpdateDateColumn, JoinColumn, OneToOne, OneToMany, ManyToOne, ManyToMany} from "typeorm"
import { Book } from "./Book";
import {User} from './User';
import {Address} from './Address';
import {OrderDetails} from './OrderDetails';
@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    delivery_number:string

    @ManyToOne(() => User ,(user_id)=>user_id.order_id)
    @JoinColumn()
    user_id: User;

    @OneToOne(() => Address ,(addr_id)=>addr_id.order_id ,{cascade:true})
    @JoinColumn()
    addr_id: Address;

    @OneToMany(() => OrderDetails , (order_details_id) => order_details_id.order_id, {cascade:true})
    order_details_id : OrderDetails[]

    @Column()
    total: number

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
