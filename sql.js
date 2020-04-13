var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "256256ZZzz",
  database: "mydb"
});




// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE goods (id INT AUTO_INCREMENT PRIMARY KEY, product VARCHAR(255), price DECIMAL(10,2), amount DECIMAL(10,0))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });




// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM customers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });


// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM goods", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });





// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "DROP TABLE goods";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table deleted");
//   });
// });



// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='mydb'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// }); 




setTimeout(() => {process.exit();}, 1000)