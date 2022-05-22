import { Router } from "express";
import cartController from "../controllers/CartController";
import { checkJwt } from "../middleware/auth/checkJwt";
const router = Router();
router.post('/add',checkJwt,cartController.add);
router.get('/updateinc/:id',checkJwt,cartController.updateInc);
router.get('/updatedec/:id',checkJwt,cartController.updateDec);
router.post('/edit/:id',cartController.edit);
router.get('/delete/:id',checkJwt,cartController.delete);
router.get('/getAll',checkJwt,cartController.getAll);

export default router;