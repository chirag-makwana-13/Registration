var mysql      = require('mysql');
var database = mysql.createConnection({
  multipleStatements: true,
  host     : 'localhost',
  user     : 'root',
  password : 'chirag13',
  database : 'all_task'
});

database.connect()
module.exports=database