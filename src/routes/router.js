const express = require('express')
const router = express.Router();

router.get('/', (_,res, next) => {
    res.send("Bienvenue sur l'API air-bnb-clone");
    next();
})



module.exports = router;