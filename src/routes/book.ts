import { Router } from "express";
import { Userroles } from "../config/config";
import BookController from "../controllers/BookController";
import { Book } from "../entity/Book";
import { checkJwt } from '../middleware/auth/checkJwt'
import { checkRole } from '../middleware/auth/checkRole'
const router = Router();

//view book
router.get("/getAll",BookController.getAll);

//get Book by id
router.get("/:id",BookController.getBook);
//create book
router.post("/add",checkJwt, checkRole([Userroles.SELLER ]) , BookController.add)


//deletebook

//edit book



export default router;