import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import userRouter from "./routes/user";
import indexRouter = require("./routes/IndexRoute");
import sellerRouter from "./routes/seller";
import AuthRouter from './routes/auth';
import genreRouter from './routes/bookgenre';
import bookRouter from './routes/book';
import cartRouter from './routes/cart';
import orderRouter from './routes/order';
import paymentRouter from './routes/payment';
import adminRouter from './routes/admin'
import * as path from 'path';
import paymentController from '../src/controllers/PaymentController'
const multer = require('multer');
// create express app
const app = express()

app.post("/payment/webhook",bodyParser.raw({type: 'application/json'}),paymentController.webhook);
app.use(cors())

app.use(bodyParser.json())
const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
      console.log("file",file);
      cb(null,'src/public/images');
    },
    filename:(req,file,cb)=>{

      cb(null,file.originalname);
    }
  });
//app.use(express.urlencoded({ extended: false }));
app.use(multer({storage:fileStorage}).single('image'));
//routes
app.use('/',AuthRouter);
app.use('/users',userRouter);
app.use('/seller',sellerRouter);
app.use('/genre',genreRouter);
app.use('/book',bookRouter);
app.use('/cart',cartRouter);
app.use('/payment',paymentRouter);
app.use('/order',orderRouter);
app.use('/admin',adminRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
//app.use(express.static('public'));  



AppDataSource.initialize().then(async () => {
    console.log("Database connected")
}).catch(error => console.log(error))


app.listen(3100 , ()=>console.log("lisenting on port 3000"))