import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middleware/auth/checkJwt";

const router = Router();
//Login route
router.post("/login", AuthController.login);



//Signup
router.post("/signup",AuthController.signup);

export default router;