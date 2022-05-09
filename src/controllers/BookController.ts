import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import config, { Userroles } from "../config/config";
import { UserRoles } from "../entity/UserRoles";
import { User } from "../entity/User";
import { BookGenre } from "../entity/BookGenre";



export default class BookController {
    static getAll = async (req: Request, res: Response) => {
        const genre_id = req.params.id;
        const BookRepository = AppDataSource.getRepository(Book);
        const BookData = await BookRepository.find({
          relations:["genre"] , 
          where:{
            genre:{
              id:genre_id
            }
          }
        });
        const BookDataRel = await BookRepository.find({
            relations:["user","genre"]
        });
        res.send({
            "Books":BookData,
            "relations": BookDataRel
        });
    };

    static getBook = async(req : Request , res: Response) =>{
      const id = req.params.id;
      const BookRepository = AppDataSource.getRepository(Book);
      const data = await BookRepository.findOne({
        where:{id},
        relations:["genre","user"]
      });
      res.send(data);
    }
    static add = async (req : Request , res: Response) => {
        
        let { title , price , desc  ,genre } = req.body;
        const image = req.file.filename;
        const id = res.locals.jwtPayload.userId;
        console.log("testing",image,id);
        const UserRepository = AppDataSource.getRepository(User);
        const BookGenreRepository = AppDataSource.getRepository(BookGenre);
        const user:User = await UserRepository.findOne({where:{id:id}});
        const genreData = await BookGenreRepository.findOne({where:{genre:genre}});
        let book = new Book();
        book.desc = desc;
        book.price = price;
        book.title = title;
        book.imgurl = image;
        book.user = user;
        book.genre = genreData;
        try{
          
          let id = parseInt(req.body.id);
          console.log("id",id);
          if(req.body.id){
            book.id = id;
          }
        }
        catch(err){console.log(err)}  
        console.log(book);
        //Validade if the parameters are ok
        const errors = await validate(book);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
            
        const BookRepository = AppDataSource.getRepository(Book);
        try {
          await BookRepository.save(book);
        } catch (e) {
          res.status(409).send(e);
          return;
        }
      
        
        res.status(201).send("Book created");
      
      
    };
}  