const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes/router')


app.use(morgan('tiny'));
app.use(router);

app.listen(4000, () =>  {
    console.log('serveur lancé sur http://localhost:4000')
})