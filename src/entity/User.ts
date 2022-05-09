import { ManyToOne ,Entity, PrimaryGeneratedColumn, Column , Unique, CreateDateColumn , UpdateDateColumn, JoinColumn, OneToOne, OneToMany, JoinTable, ManyToMany} from "typeorm"
import { Length, IsNotEmpty , IsEmail} from "class-validator";
import * as bcrypt from "bcryptjs";
import { UserRoles } from "./UserRoles";
import { Book } from "./Book";
import { Cart } from "./Cart";
import { Userroles } from "../config/config";
import { Order } from "./Order";

@Entity()
@Unique(["username"])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Length(4,20)
    username: string

    @Column()
    @IsEmail()
    email: string
    
    @Column()
    password: string

    @Column()
    mobile: string

    @Column({
      nullable:true
    }
    )
    company:string

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=> UserRoles , (userrole) => userrole.user ,{cascade:true})
    @JoinTable()
    userrole:UserRoles

    @OneToMany(() => Book ,(books) => books.user)
    books:Book[]

    @OneToMany(() => Cart , (cart_books) => cart_books.user_id)
    cart_books: Cart

    @OneToMany(() => Order ,(order_id)=>order_id.user_id)
    order_id: Order;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
      }
    
      checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
      }
}
