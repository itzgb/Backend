import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { BookGenre } from "../entity/BookGenre";
import config, { Userroles } from "../config/config";
import { UserRoles } from "../entity/UserRoles";
import { Book } from "../entity/Book";



export default class BookGenreController {
    static getGenres = async (req: Request, res: Response) => {
      
      const take = req.query.limit;
      const skip = req.query.page * take;
      console.log(take,skip)
        const BookGenreRepository = AppDataSource.getRepository(BookGenre);
        const genreData = await BookGenreRepository.findAndCount({
          take,
          skip
        }).then(d=>{
          console.log(d)
          res.send(d);
        }).catch(err=>console.log(err));
    };

    static getAll = async (req: Request, res: Response) => {
      
      
        const BookGenreRepository = AppDataSource.getRepository(BookGenre);
        const genreData = await BookGenreRepository.find().then(d=>{
          console.log(d)
          res.send(d);
        }).catch(err=>console.log(err));
    };

    static getBooks = async (req: Request, res: Response) => {
      const genre_id = req.params.id;
      const take = req.query.limit;
      const skip = req.query.page * take; 
      const BookRepository = AppDataSource.getRepository(Book);
      try{

        const BookData = await BookRepository.findAndCount({
          relations:["genre"] , 
          where:{
          genre:{
            id:genre_id
          }
        } ,
        take,
        skip
      }).then(data=>{
        res.send(
          data
        );
      }).catch(err=>console.log(err));
      }
      catch(err){
        console.log(err);
      }
      
      
  };


    static add = async (req : Request , res: Response) => {
      console.log("genre add",req)
      let image = req.file.filename;
        let { genre } = req.body;
        let bookgenre = new BookGenre();
        bookgenre.genre = genre;
        bookgenre.imgurl = image;
        console.log(bookgenre);
        //Validade if the parameters are ok
        const errors = await validate(bookgenre);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
            
        const BookGenreRepository = AppDataSource.getRepository(BookGenre);
        try {
          await BookGenreRepository.save(bookgenre);
        } catch (e) {
          res.status(409).send(e);
          return;
        }
      
        
        res.status(201).send("Book Genre created");
      
      
    };
 
    static delete = async (req : Request , res: Response) => {
      const id = req.params.id;
      const BookGenreRepository = AppDataSource.getRepository(BookGenre);
      const genre = await BookGenreRepository.findOne(id);
        try {
          await BookGenreRepository.remove(genre);
        } catch (e) {
          res.status(409).send(e);
          return;
        }
      
        
        res.status(201).send("Book Genre Delete");
    }
}  