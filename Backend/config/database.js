var mysql = require("mysql");
var cred =  {};

cred = {
    user: process.env.DATABASE_USER,
    password : process.env.DATABASE_PASS,
    database : process.env.DATABASE_NAME,
    dateStrings : 'date',
    multipleStatements: true
};

var database = mysql.createPool(cred);

module.exports = database;