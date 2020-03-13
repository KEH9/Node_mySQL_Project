var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "256256ZZzz",
  database: "mydb"
});




con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});



// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='mydb'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// }); 


// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "DROP TABLE users";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table deleted");
//   });
// });


setTimeout(() => {process.exit();}, 1000)