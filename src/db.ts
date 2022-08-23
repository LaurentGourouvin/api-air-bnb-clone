import dotenv from 'dotenv';
dotenv.config();

import { Client } from 'pg';

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATBASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT)
});

client.connect()
    .then(()=> console.log("Connecté à la base de donnée !"))
    .catch(err => console.log("Erreur à la connexion =>", err.stack))

export default client;