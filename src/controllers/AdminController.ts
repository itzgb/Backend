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
}