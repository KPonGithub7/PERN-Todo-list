const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    database: "perntodo",
    user: "postgres",
    port: "5432",
    password: "thepostgrepassword",
});

module.exports = pool;
