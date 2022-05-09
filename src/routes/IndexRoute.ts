import * as express from "express";
var router = express.Router();
import { NextFunction, Request, Response } from "express"

router.get('/'  , async(request: Request, response: Response, next: NextFunction)=>{
    console.log(request);
    console.log(request.path);
    response.json({
        message:"Hello World"
    });
});

export = router;
