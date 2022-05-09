import { Entity, PrimaryGeneratedColumn, Column , Unique, CreateDateColumn , UpdateDateColumn, JoinColumn, OneToOne, OneToMany, ManyToOne, ManyToMany} from "typeorm"
import { Book } from "./Book";
import {User} from './User';
import {Address} from './Address';
import {Order} from './Order';
@Entity()
export class OrderDetails {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity:number

    @OneToOne(() => Book )
    @JoinColumn()
    book_id:Book[]

    @ManyToOne(()=> Order , (order_id)=>order_id.order_details_id)
    @JoinColumn()
    order_id:Order

    @Column()
    subtotal: number

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
