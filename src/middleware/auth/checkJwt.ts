import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization.split(" ")[1];
  console.log(req.headers);
  console.log(token);
  const data = token.split('"').join('');
  console.log(data);
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(data, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    
    res.status(401).send();
    return;
  }

  const { userId, username } = jwtPayload;
  
  console.log("done" ,userId,username);
  //Call the next middleware or controller
  next();
};