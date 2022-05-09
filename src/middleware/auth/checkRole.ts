import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { AppDataSource } from "../../data-source";

import { User } from "../../entity/User";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
  
    const id = res.locals.jwtPayload.userId;
    console.log("rle",id);
    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOne({
        where:{id:id} ,
        relations:['userrole']
      });
    } catch (id) {
      res.status(401).send();
    }
    console.log(user);
    if (roles.indexOf(user.userrole.role) > -1) next();
    else res.status(401).send("Access Denied");
  };
};