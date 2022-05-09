import { Router } from "express";
import orderController from "../controllers/OrderController";
import { checkJwt } from "../middleware/auth/checkJwt";
const router = Router();

router.get('/getAll',checkJwt,orderController.getAll);

export default router;