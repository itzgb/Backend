import { Entity, PrimaryGeneratedColumn, Column , Unique, CreateDateColumn , UpdateDateColumn, JoinColumn, OneToMany} from "typeorm"
import { Length, IsNotEmpty , IsEmail} from "class-validator";
import { User } from "./User";
import {Userroles} from '../config/config';


@Entity()
export class UserRoles {

    @PrimaryGeneratedColumn()
    role_id: number

    @OneToMany(()=> User ,(user) => user.userrole)
    user:User[]
    
    @Column()
    role:Userroles

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
