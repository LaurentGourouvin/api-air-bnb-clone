// import node module
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// import own module
const usersDataMapper = require('../datamapper/users')
const { createUserSchema, loginUserSchema } = require('../validator/users')

const userController = {
    async getUsers(_,res){
        try {
            const users = await usersDataMapper.getUsers();
            res.json(users)
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    },
    
    async createUser(req,res, next) {
        console.log("$ USERS CONTROLLER => createUser() => ");
        console.log("$ req_body", req.body);
        const { username, firstname, lastname, password, email } = req.body;
        const user = { username, firstname, lastname, password, email };

        // Vérification JOI
        const {value, error} = createUserSchema.validate(user);
        if(error) {
            console.log("$ JOI VALIDATE => createUserSchema() => ",error)
            res.status(500).json(error.details)
            return next();
        }
        // Création du compte utilisateur dans la BDD
        try {
            // hash du mot de passe de l'utilisateur
            const salt = await bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hashSync(password, salt);
            user.password = hashPassword;

            const createUser = await usersDataMapper.createUser(user);
            if(createUser){
                res.status(201).json(createUser);
            }
            else {
                res.status(409).json({message: "L'utilisateur existe déjà ! Essayez de vous connecter à votre compte."});
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
        next();
    },

    async loginUser(req, res, next) {
        console.log("$ USERS CONTROLLER => loginUser() => ");
        console.log("$ req_body", req.body);
        const { email, password } = req.body;
        const user = { email, password };

        // Vérification JOI
        const {value, error} = loginUserSchema.validate(user);
        if(error) {
            console.log("$ JOI VALIDATE => loginUser () => ",error)
            res.status(500).json(error.details)
            return next();
        }

        try {
            // const salt = await bcrypt.genSaltSync(10);
            // const hashPassword = await bcrypt.hashSync(password, salt);
            // user.password = hashPassword;

            const loginUser = await usersDataMapper.loginUser(user);
            
            if(loginUser){
                const userToken = jwt.sign(user, process.env.SECRET_TOKEN, {algorithm: 'HS256', expiresIn: '1h'});
                res.status(200).json({user_token: userToken});
            }
            else {
                res.status(401).json({message: "Identifiants de connexion incorrect !"})
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
}

module.exports = userController;