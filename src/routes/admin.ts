import { Router } from "express";
import { Userroles } from "../config/config";
import AdminController from "../controllers/AdminController";
import BookGenreController from "../controllers/BookGenreController";
import { checkJwt } from "../middleware/auth/checkJwt";
import { checkRole } from "../middleware/auth/checkRole";

const router = Router();

//view books,users,orders,genres

router.get("/getBooks" ,checkJwt ,checkRole([Userroles.ADMIN]) , AdminController.getBooks);
router.get("/getUsers" ,checkJwt ,checkRole([Userroles.ADMIN]) , AdminController.getUsers);
router.get("/getOrders" ,checkJwt ,checkRole([Userroles.ADMIN]) , AdminController.getOrders);
router.get("/getGenres" ,checkJwt ,checkRole([Userroles.ADMIN]) , BookGenreController.getAll);


router.get("/delBook/:id" ,checkJwt ,checkRole([Userroles.ADMIN]) , AdminController.delBook);
router.get("/delUser/:id" ,checkJwt ,checkRole([Userroles.ADMIN]) , AdminController.delUser);
router.get("/delOrder/:id" ,checkJwt ,checkRole([Userroles.ADMIN]) , AdminController.delGenre);
router.get("/delGenre/:id" ,checkJwt ,checkRole([Userroles.ADMIN]) , AdminController.delOrder);

//create book

//deletebook

//edit book

export default router