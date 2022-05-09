import * as express from "express";
import paymentController from "../controllers/PaymentController";
import { checkJwt } from "../middleware/auth/checkJwt";
const router = express.Router();

router.post("/pay",checkJwt,paymentController.pay);

export default router;