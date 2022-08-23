import express, { Express, NextFunction, Request, Response, Router} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

import router from './routes/router';
import apiRouter from './routes/apiRoutes'

const app : Express = express();


app.use(morgan('tiny'), (req: Request, res: Response, next: NextFunction) => { console.log(new Date()); next()});

app.use(cors({
    "origin": "http://localhost:3000",
    credentials: true,
}))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

app.use(router);
app.use(apiRouter);

app.listen(4000, () =>  {
    console.log('serveur lancé sur http://localhost:4000')
})