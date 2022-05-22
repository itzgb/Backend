import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import config, { Userroles } from "../config/config";
import { UserRoles } from "../entity/UserRoles";

class AuthController {

  static logout = async (req: Request, res: Response) => {};

  static signup = async (req:Request , res:Response) =>{
    //Get parameters from the body
  let { username, password , email , mobile } = req.body;
  let user = new User();
  user.username = username;
  user.email = email;
  user.password = password;
  user.mobile = mobile;
  
  console.log(req.baseUrl , req.originalUrl);
  let role;
  if(req.baseUrl == '/seller'){
    role = Userroles.SELLER
    user.company = req.body.company;
  }
  else {
    role = Userroles.USER
  }console.log(role);
    const UserRolesRepository = AppDataSource.getRepository(UserRoles);  
    let roles = await UserRolesRepository.findOne({where:{role }});
    if(roles == null){
      console.log("create new role",role);
      roles = await UserRolesRepository.save({role});


    }
    
  
  user.userrole = roles;
  console.log(user);
  //Validade if the parameters are ok
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Hash the password, to securely store on DB
  user.hashPassword();

  //Try to save. If fails, the username is already in use

  const userRepository = AppDataSource.getRepository(User);
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send(e);
    return;
  }

  
  res.status(201).send("User created");


  };

  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    
    //Get user from database
    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    
    try {
      user = await userRepository.findOne({ 
        where: { email:email },
        relations:["userrole"]
      });
    } catch (error) {
      res.status(401).send();
    }

    //Check if encrypted password match
    console.log(user);
    console.log("passw = ",password);
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      
    );
      let userdata = {
        username : user.username,
        role: user.userrole.role
      }
    //Send the jwt in the response
    res.send(
      { token:token,
        user: userdata
      });
  };

  
  
}
export default AuthController;