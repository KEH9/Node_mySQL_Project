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
//   var sql = "CREATE TABLE orders_products (id INT AUTO_INCREMENT PRIMARY KEY, order_id INT, product_id INT, product_name VARCHAR(255), amount DECIMAL(10,0), price DECIMAL(10,2), sum DECIMAL(10,2))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });



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
//   console.log("Connected!");
//   var sql = "CREATE TABLE orders (id INT AUTO_INCREMENT PRIMARY KEY, customer_id INT, customer_name VARCHAR(255), customer_address VARCHAR(255), total DECIMAL(10,2))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });




con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM orders_products", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});


// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM orders", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });



// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SHOW TABLE STATUS LIKE 'orders'", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     console.log(result[0].Auto_increment);
//   });
// });



// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SET PERSIST information_schema_stats_expiry = 0", function (err, result, fields) {
//     if (err) throw err;
//   });
// });



// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'mydb' AND TABLE_NAME = 'orders'", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     console.log(result[0].AUTO_INCREMENT);
//   });
// });




// con.connect(function(err) {
//   if (err) throw err;
//   con.query("DELETE FROM customers WHERE id = '18'", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });





// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "DROP TABLE orders_products";
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


// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'goods' AND COLUMN_NAME = 'id'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// }); 





setTimeout(() => {process.exit();}, 1000)