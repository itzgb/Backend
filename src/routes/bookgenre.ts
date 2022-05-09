import { Router } from "express";
import BookGenreController from "../controllers/BookGenreController";
const router = Router();

//view book
router.get("/getAllGenre",BookGenreController.getAll);
router.get("/getGenres",BookGenreController.getGenres);
router.get("/getBooks/:id" , BookGenreController.getBooks);
router.post("/add",BookGenreController.add);
router.post("/delete/:id",BookGenreController.delete);
//create book

//deletebook

//edit book

export default router