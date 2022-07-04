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
    
    async createUser(req,res) {
        const { username, firstname, lastname, password, email } = req.body;
        const user = { username, firstname, lastname, password, email };

        // Vérification JOI
        const {value, error} = userValidator.validate(user);
        if(error) {
            res.status(500).json(error.details)
            return null;
        }

        // Création du compte utilisateur dans la BDD
        try {
            const createUser = await usersDataMapper.createUser(user);
            if(createUser.rowCount === 1){
                res.status(200).json(createUser);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    async loginUser(req, res) {
        const { email, password } = req.body;
    }
}

module.exports = userController;