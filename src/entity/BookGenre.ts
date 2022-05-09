import { Entity, PrimaryGeneratedColumn, Column , Unique, CreateDateColumn , UpdateDateColumn, JoinColumn, OneToOne , ManyToOne, OneToMany} from "typeorm"
import { Length, IsNotEmpty , IsEmail} from "class-validator";
import * as bcrypt from "bcryptjs";
import { UserRoles } from "./UserRoles";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class BookGenre {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    genre:string

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

    @OneToMany(()=> Book ,(books) => books.genre)
    books:Book[]
  

}
