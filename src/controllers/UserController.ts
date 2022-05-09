import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";
import {Userroles} from '../config/config';
import { AppDataSource } from "../data-source";
import { UserRoles } from "../entity/UserRoles";
import { Book } from "../entity/Book";
import { Order } from "../entity/Order";
class UserController{

static listAll = async (req: Request, res: Response) => {
  //Get users from database
  const userRepository = AppDataSource.getRepository(User);
  /* filter part
  let role;
  if(req.path == "/users/getAllUsers"){
    role = Userroles.SELLER;
  }else{
    role =  Userroles.SELLER;
  }
  console.log(role , req.path , req.baseUrl , req.originalUrl);
  /*
  const users = await userRepository.find({where:{role:role},
    select: ["id", "username", "role"] 
  });
  const users = await userRepository.find({
    relations:['role'] ,
     where:{ role: {role : role} }
    });*/
  //Send the users object

  const users = await userRepository.find({
    relations:['userrole'] 
    });
  res.send(users);
};

static listAllOnlyUsers = async (req: Request, res: Response) => {
  //Get users from database
  const userRepository = AppDataSource.getRepository(User);
  /* filter part
  let role;
  if(req.path == "/users/getAllUsers"){
    role = Userroles.SELLER;
  }else{
    role =  Userroles.SELLER;
  }
  console.log(role , req.path , req.baseUrl , req.originalUrl);
  /*
  const users = await userRepository.find({where:{role:role},
    select: ["id", "username", "role"] 
  });
  const users = await userRepository.find({
    relations:['role'] ,
     where:{ role: {role : role} }
    });*/
  //Send the users object
  const UserRolesRepository = AppDataSource.getRepository(UserRoles);  
  const userrole = await UserRolesRepository.find({where:{role:Userroles.USER}});
  const users = await userRepository.find({
    relations:['userrole'],
    where:{userrole: true} 
    });
  res.send(users);
};

///seller


static getSellerBooks = async (req: Request, res: Response) => {
  const id = res.locals.jwtPayload.userId;
  const BookRepository = AppDataSource.getRepository(User);
  const BookData = await BookRepository.findOne({
    relations:["books", "books.genre" ] , 
    where:{id:id}
  });
  console.log("books",BookData);
  res.send(BookData.books);
};

static getSellerOrders = async (req:Request , res:Response) =>{
  const id = res.locals.jwtPayload.userId;
  const OrderRepository = AppDataSource.getRepository(Order);
  const BookData = await OrderRepository.find({
    relations:["user_id","addr_id", "order_details_id","order_details_id.book_id","order_details_id.book_id.user" ] , 
    where:{
      order_details_id:{
        book_id:{
          user:{
            id:id
          }
        }
      }
    }
  });
  res.send(BookData);
};

static getBookById = async(req: Request, res: Response) =>{
  const book_id = req.params.id;
  const user_id = res.locals.jwtPayload.userId;
  const UserRepository = AppDataSource.getRepository(User);
  const BookRepository = AppDataSource.getRepository(Book);
  const BookData = await UserRepository.findOne({
    relations:["books", "books.genre"] , 
    where:{
      id:user_id,
      books:{
        id:book_id
      }
    }
  });

  res.send(BookData);
}

static deleteBookById = async(req: Request, res: Response) =>{
  console.log("delete consoller")
  const book_id = req.params.id;
  const user_id = res.locals.jwtPayload.userId;
  const UserRepository = AppDataSource.getRepository(User);
  const BookRepository = AppDataSource.getRepository(Book);
  const BookData = await UserRepository.findOne({
    relations:["books", "books.genre"] , 
    where:{
      id:user_id,
      books:{
        id:book_id
      }
    }
  });
  console.log("delete controller",BookData.books[0]);
  //console.log("deel ",BookData);
  await BookRepository.remove(BookData.books[0]);
  res.send("Deleted Successfully");
}
/*
static getOneById = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;

  //Get the user from database
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOneOrFail({
      //where:{ id:id }, 
      select: ["id", "username", "userrole"] //We dont want to send the password on response
    });
  } catch (error) {
    res.status(404).send("User not found");
  }
};

static newUser = async (req: Request, res: Response) => {
  //Get parameters from the body
  //let { username, password, role } = req.body;
  let user = new User();
  user = req.body;
  //Validade if the parameters are ok
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Hash the password, to securely store on DB
  user.hashPassword();

  //Try to save. If fails, the username is already in use
  const userRepository = getRepository(User);
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }

  //If all ok, send 201 response
  res.status(201).send("User created");
};

static editUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id:number = req.params.id;

  //Get values from the body
  const { username, role } = req.body;

  //Try to find user on database
  const userRepository = getRepository(User);
  let user;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send("User not found");
    return;
  }

  //Validate the new values on model
  user.username = username;
  user.role = role;
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Try to safe, if fails, that means username already in use
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};

static deleteUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;

  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("User not found");
    return;
  }
  userRepository.delete(id);

  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};
*/
};

export default UserController;