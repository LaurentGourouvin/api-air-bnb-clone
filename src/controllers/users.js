// import node module
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// import own module
const usersDataMapper = require('../datamapper/users')
const userValidator = require('../validator/users')

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
        const { username, firstname, lastname, password, email } = req.body;
        const user = { username, firstname, lastname, password, email };

        // Vérification JOI
        const {value, error} = userValidator.validate(user);
        if(error) {
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
            if(createUser.id){
                res.status(200).json(createUser);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
        next();
    },

    async loginUser(req, res) {
        const { email, password } = req.body;
    }
}

module.exports = userController;