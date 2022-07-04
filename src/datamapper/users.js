const bcrypt= require('bcrypt');
const client = require('../db');

const usersDataMapper = {

    async createUser(user){
        const {username, firstname, lastname, password, email} = user;
        const createUserQuery = `INSERT INTO "users"(username, firstname, lastname, password, email) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
        const valuesQuery = [username, firstname, lastname, password, email];

        try {
            const allUser = await this.findAll();
            console.log("AllUser =>", allUser)
            let existUser = null;
            if(allUser.length > 0) {
                existUser = allUser.find((user) => user.email.toLowerCase() === email.toLowerCase())
                console.log("existeUser => ", existUser)
            }
            if(existUser){
                return false;
            }
            const resultCreateUser = await client.query(createUserQuery, valuesQuery);
            return resultCreateUser.rows[0];
        }
        catch (error) {
            console.error(error);
        }
    },

    async loginUser(user){
        const loginUserQuery = `SELECT * FROM "users" where email = '${user.email}';`

        try {
            const resultLoginUser = await client.query(loginUserQuery);
            if(resultLoginUser.rowCount > 1 || resultLoginUser.rowCount === 0) {
                return false;
            }
            else {
                console.log("je compare les mdps")
                const compareUser = resultLoginUser.rows[0];
                const matchPassword = await bcrypt.compareSync(user.password, compareUser.password);
                console.log("matchPassword => ", matchPassword)
                if(matchPassword) {
                    console.log('les mots de passes sont identiques !');
                    return compareUser;
                }
                else {
                    return false;
                }
            }
        }
        catch (error){
            console.log(error)
        }
    },

    async findAll(){
        try{
            const findAllQuery = `SELECT * from "users";`
            const resultFindAllQuery = await client.query(findAllQuery);
            console.log("findAll user => ", resultFindAllQuery)
            if(resultFindAllQuery.rowCount === 0) {
                return false
            }
            else{
                return resultFindAllQuery.rows;
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}

module.exports = usersDataMapper;