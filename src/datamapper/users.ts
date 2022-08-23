import bcrypt from 'bcrypt';
import client from '../db';


const usersDataMapper = {

    async createUser(user: any){
        const {username, firstname, lastname, password, email} = user;
        const createUserQuery: string = `INSERT INTO "users"(username, firstname, lastname, password, email) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
        const valuesQuery: string[] = [username, firstname, lastname, password, email];

        try {
            const resultAllUsers: any = await this.findAll();
            console.log("AllUser =>", resultAllUsers)
            let existUser = null;
            if(resultAllUsers.length > 0) {
                existUser = resultAllUsers.find((rowOfOneUser : any) => rowOfOneUser.email.toLowerCase() === email.toLowerCase())
                console.log("existeUser => ", existUser)
            }
            if(existUser){
                return false;
            }
            const resultCreateUser: any = await client.query(createUserQuery, valuesQuery);
            return resultCreateUser.rows[0];
        }
        catch (error) {
            console.error(error);
        }
    },

    async loginUser(user : any){
        const loginUserQuery: string = `SELECT * FROM "users" where email = '${user.email}';`

        try {
            const resultLoginUser: any = await client.query(loginUserQuery);
            if(resultLoginUser.rowCount > 1 || resultLoginUser.rowCount === 0) {
                return false;
            }
            else {
                console.log("je compare les mdps")
                const compareUser: any = resultLoginUser.rows[0];
                const matchPassword: boolean = await bcrypt.compareSync(user.password, compareUser.password);
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
            const findAllQuery: string = `SELECT * from "users";`
            const resultFindAllQuery: any = await client.query(findAllQuery);
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

export default usersDataMapper;