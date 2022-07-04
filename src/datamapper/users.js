const client = require('../db');

const usersDataMapper = {
    async getUsers() {
        const getUsersQuery = `SELECT * FROM "users";`;
        try {
            const usersQueryResult = await client.query(getUsersQuery);
            return usersQueryResult.rows;
        }
        catch(error) {
            console.error(error);
        }
    },

    async createUser(user){
        const {username, firstname, lastname, password, email} = user;
        const createUserQuery = `INSERT INTO "users"(username, firstname, lastname, password, email) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
        const valuesQuery = [username, firstname, lastname, password, email];

        try {
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
                const compareUser = resultLoginUser.rows[0];
                if(user.password === compareUser.password) {
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
    }
}

module.exports = usersDataMapper;