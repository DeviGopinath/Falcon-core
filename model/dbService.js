const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

let instance = null;

const connection = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
});

connection.connect();

module.exports = connection;
