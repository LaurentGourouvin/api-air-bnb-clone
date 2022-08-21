const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const router = require('./routes/router')
const apiRouter = require('./routes/apiRoutes')

app.use(morgan('tiny'), (req, res, next) => { console.log(new Date()); next()});

app.use(cors({
    "origin": "http://localhost:3000",
    credentials: true,
}))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

// app.use(express.json());
// app.use(express.urlencoded({extended:true}))


app.use(router);
app.use(apiRouter);

app.listen(4000, () =>  {
    console.log('serveur lancé sur http://localhost:4000')
})