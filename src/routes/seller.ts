import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middleware/auth/checkJwt";
import { checkRole } from "../middleware/auth/checkRole";
import {Userroles} from "../config/config";
import AuthController from "../controllers/AuthController";
const router = Router();


//Login Seller
router.post("/signup",AuthController.signup);

//Get all users
router.get("/getAllSeller", checkJwt, checkRole([Userroles.ADMIN]), UserController.listAll);

router.get("/getBooks",checkJwt, checkRole([ Userroles.SELLER ]), UserController.getSellerBooks)

router.get("/getOrders",checkJwt, checkRole([ Userroles.SELLER ]), UserController.getSellerOrders)

router.get("/getBookById/:id",checkJwt,checkRole([ Userroles.SELLER ]),UserController.getBookById);

router.get("/deleteBookById/:id",checkJwt,checkRole([ Userroles.SELLER ]),UserController.deleteBookById);
/*
//Create a new user
router.post("/add", checkJwt, checkRole([Userroles.ADMIN]), UserController.newUser);

//Edit one user
router.post(
  "/update",
  checkJwt, checkRole([Userroles.ADMIN]),
  UserController.editUser
);

//Delete one user
router.delete(
  "/delete/:id([0-9]+)",
  checkJwt, checkRole([Userroles.ADMIN]),
  UserController.deleteUser
);
*/
export default router;