var mysql      = require('mysql');
require("dotenv").config()

var database = mysql.createConnection({
  multipleStatements: true,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});

database.connect()
module.exports=database