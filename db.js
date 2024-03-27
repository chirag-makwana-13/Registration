var mysql      = require('mysql');
var database = mysql.createConnection({
  multipleStatements: true,
  host     : 'localhost',
  user     : 'root',
  password : 'chirag13',
  database : 'schema20_3'
});

database.connect()
module.exports=database