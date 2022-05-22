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
import { Review } from "../entity/Review";



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
    static getRecentlyAddedBook = async(req : Request , res: Response) =>{
      console.log("this log");
      const BookRepository = AppDataSource.getRepository(Book);
      const data = await BookRepository.find({
        relations:["genre","user"],
        order:{
          createdAt:"DESC"
        }
      }).then(d=>{
        res.send(d);

      }).catch(err=>console.log(err));
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

    static delete = async(req :Request , res:Response) =>{
      const id = req.params.id;
      const BookReposiory = AppDataSource.getRepository(Book);
      const book = await BookReposiory.findOne({where:{id:id}});
      const resp = await BookReposiory.remove(book);
      console.log(resp);
      res.send("book deleted Succesfully")
  }

  static addReview = async(req :Request , res:Response) =>{
    const id = res.locals.jwtPayload.userId;  
    console.log("review ",req.body);
    const {  rating , comment } = req.body;
    const book_id = parseInt(req.body.id);    
    const UserRepository = AppDataSource.getRepository(User);
    const ReviewRepository = AppDataSource.getRepository(Review);
    const BookRepository = AppDataSource.getRepository(Book);
    const user:User = await UserRepository.findOne({where:{id:id}});
    const book = await BookRepository.findOne({where:{id:book_id}});
    let data = new Review();
    data.book = book;
    data.user = user.username;
    data.rating = rating;
    data.comment = comment;
    const resp = await ReviewRepository.save(data);
    console.log(resp);
    res.send("Review Added Succesfully");
  }

  
}  