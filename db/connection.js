const mysql = require("mysql");
//Installs promisify module from util to allow async functions to be used
const { promisify } = require("util");
//Connection host/credentials
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_DB"
});
//Establish connection to use promises on a connection query
connection.connect();
connection.query(promisify.query);

module.exports = connection;