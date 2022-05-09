import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middleware/auth/checkJwt";
import { checkRole } from "../middleware/auth/checkRole";
import {Userroles} from "../config/config";
const router = Router();

//Get all users
router.get("/getAll", UserController.listAll);
//router.get("/getAll", checkJwt, checkRole([Userroles.ADMIN]), UserController.listAll);

router.get("/getAllOnlyUsers", UserController.listAllOnlyUsers);
/*
//Create a new user
router.post("/addUser", checkJwt, checkRole([Userroles.ADMIN]), UserController.newUser);

//Edit one user
router.patch(
  "/editUser/:id([0-9]+)",
  checkJwt, checkRole([Userroles.ADMIN]),
  UserController.editUser
);

//Delete one user
router.delete(
  "/deleteUser/:id([0-9]+)",
  checkJwt, checkRole([Userroles.ADMIN]),
  UserController.deleteUser
);
*/
export default router;