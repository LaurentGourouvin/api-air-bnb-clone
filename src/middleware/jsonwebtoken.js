const jsonWebToken = (req, res, next) => {
    console.log("$ MiddleWare -> jsonWebToken");
    console.log(req.body.Authorization)
    next();
}

module.exports = jsonWebToken;