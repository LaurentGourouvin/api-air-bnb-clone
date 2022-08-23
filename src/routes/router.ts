import express, { Request, Response, Express, Router} from 'express'

const router: Router = express.Router();

router.get('/', (req: Request,res : Response, next) => {
    res.send("Bienvenue sur l'API air-bnb-clone");
    next();
})



export default router;