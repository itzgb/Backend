import { Request, Response } from "express";
import { User } from "../entity/User";
import { Book } from "../entity/Book";
import { Cart } from "../entity/Cart";
import { AppDataSource } from "../data-source";

export default class BookController {
    static getAll = async(req :Request , res:Response) =>{
        const user_id:any = res.locals.jwtPayload.userId;
        const CartReposiory = AppDataSource.getRepository(Cart);
        const UserReposiory = AppDataSource.getRepository(User);
        const user = await UserReposiory.findOne({
            where:{id:user_id} ,
             relations:["cart_books", "cart_books.book_id"] ,
             order:{
                 cart_books:{
                     id:"ASC"
                 }
             }
            });
        //const cart = await CartReposiory.findOne({where:{user_id:user_id} ,relations:["user_id"] });
        console.log(user);
        res.send(user); 
    }
    static add = async(req :Request , res:Response) =>{
        const book_id = req.params.id;
        const user_id = res.locals.jwtPayload.userId;
        console.log(book_id,user_id);
        const CartReposiory = AppDataSource.getRepository(Cart);
        const UserReposiory = AppDataSource.getRepository(User);
        const BookReposiory = AppDataSource.getRepository(Book);
        const users = await UserReposiory.findOne({where:{id:user_id}});
        const book = await BookReposiory.findOne({where:{id:book_id}});
        try{
            const resp = await CartReposiory.save({user_id:users , book_id:book , total: 10 , quantity : 1 });
            console.log("cartsp" , resp);
        } 
        catch (e) {
            console.log("err",e);
            res.status(409).send(e);
            return;
          }
          res.send("Added to Cart Successfully")
    }

    static updateInc = async(req :Request , res:Response) =>{
        const id = req.params.id;
        const CartReposiory = AppDataSource.getRepository(Cart);
        const cart = await CartReposiory.findOne({where:{id:id}});
        console.log("changing cart",cart);
        cart.quantity = cart.quantity + 1;
        const resp = await CartReposiory.save(cart);
        res.send("quantity added and updated Succesfully")
    }
    static updateDec = async(req :Request , res:Response) =>{
        const id = req.params.id;
        const CartReposiory = AppDataSource.getRepository(Cart);
        const cart = await CartReposiory.findOne({where:{id:id}});
        cart.quantity = cart.quantity - 1;
        const resp = await CartReposiory.save(cart);
        console.log(resp);
        res.send("quantity decremented and updated Succesfully")
    }

    static edit = async(req :Request , res:Response) =>{}
    static delete = async(req :Request , res:Response) =>{
        const id = req.params.id;
        const CartReposiory = AppDataSource.getRepository(Cart);
        const cart = await CartReposiory.findOne({where:{id:id}});
        const resp = await CartReposiory.remove(cart);
        console.log(resp);
        res.send("cart item deleted Succesfully")
    }
}