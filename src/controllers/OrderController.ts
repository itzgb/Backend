import { Request, Response } from "express";
import { User } from "../entity/User";
import { Book } from "../entity/Book";
import { Cart } from "../entity/Cart";
import {Order} from "../entity/Order";
import { AppDataSource } from "../data-source";

export default class OrderController {
    static getAll = async(req :Request , res:Response) =>{
        const user_id:any = res.locals.jwtPayload.userId;
        const OrderReposiory = AppDataSource.getRepository(Order);
        const UserReposiory = AppDataSource.getRepository(User);
        const user = await UserReposiory.findOne({
            where:{id:user_id} ,
             relations:["order_id" ,"order_id.addr_id" , "order_id.order_details_id","order_id.order_details_id.book_id"] ,
            });
        //const cart = await CartReposiory.findOne({where:{user_id:user_id} ,relations:["user_id"] });
        console.log(user);
        res.send(user); 
    }
}

