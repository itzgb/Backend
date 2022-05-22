import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import config, { Userroles } from "../config/config";
import { UserRoles } from "../entity/UserRoles";
import { User } from "../entity/User";
import { BookGenre } from "../entity/BookGenre";
import { Order } from "../entity/Order";

export default class AdminController{
    static getBooks = async(req:Request , res:Response) => {
        const BookRepository = AppDataSource.getRepository(Book);
        const BookData = await BookRepository.find({
            relations:["user","genre"]
        });
        res.send(BookData);
    }
    static getUsers = async(req:Request , res:Response) => {
        const UserRepository = AppDataSource.getRepository(User);
        const UserData = await UserRepository.find();
        res.send(UserData);
    }
    static getGenres = async(req:Request , res:Response) => {
        const BookGenreRepository = AppDataSource.getRepository(BookGenre);
        const BookGenreData = await BookGenreRepository.find();
        res.send(BookGenreData);
    }
    static getOrders = async(req:Request , res:Response) => {
        const OrderRepository = AppDataSource.getRepository(Order);
        const OrderData = await OrderRepository.find({
            relations:["user_id","addr_id","order_details_id","order_details_id.book_id","order_details_id.book_id.user"]
        });
        res.send(OrderData);
    }

    static delBook = async(req:Request , res:Response) => {
        const id = req.params.id;
        const BookRepository = AppDataSource.getRepository(Book);
        const BookData = await BookRepository.findOne({
            where:{id:id}
        });
        try{
            await BookRepository.remove(BookData);
        }
        catch(err){console.log(err); res.send(err) }
        res.send("Book Deleted")

    }
    static delUser = async(req:Request , res:Response) => {
        const id = req.params.id;
        const UserRepository = AppDataSource.getRepository(User);
        const UserData = await UserRepository.findOne({
            where:{id:id}
        });
        try{
            await UserRepository.remove(UserData);
        }
        catch(err){console.log(err); res.send(err) }
        res.send("User Deleted")

    }
    static delGenre = async(req:Request , res:Response) => {
        const id = req.params.id;
        const BookGenreRepository = AppDataSource.getRepository(BookGenre);
        const BookGenreData = await BookGenreRepository.find({
            where:{id:id}
        });
        try{
            await BookGenreRepository.remove(BookGenreData);
        }
        catch(err){console.log(err); res.send(err) }
        res.send("Book Genre Deleted")

    }
    static delOrder = async(req:Request , res:Response) => {
        const id = req.params.id;
        const OrderRepository = AppDataSource.getRepository(Order);
        const OrderData = await OrderRepository.find({
            where:{id:id}
        });
        try{
            await OrderRepository.remove(OrderData);
        }
        catch(err){console.log(err); res.send(err) }
        res.send("Order Deleted")

    }

}

