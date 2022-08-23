import { Request, Response } from "express";

const jsonWebToken = (req: Request, res: Response, next: any) => {
    console.log("$ MiddleWare -> jsonWebToken");
    console.log(req.body.Authorization)
    next();
}

module.exports = jsonWebToken;