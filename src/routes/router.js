const express = require('express')
const router = express.Router();

router.get('/', (_,res, next) => {
    next();
})

module.exports = router;