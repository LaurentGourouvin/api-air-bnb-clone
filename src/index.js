const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes/router')
const apiRouter = require('./routes/apiRoutes')

app.use(express.urlencoded({extended:false}))

app.use(morgan('tiny'));
app.use(router);
app.use(apiRouter);

app.listen(4000, () =>  {
    console.log('serveur lancé sur http://localhost:4000')
})