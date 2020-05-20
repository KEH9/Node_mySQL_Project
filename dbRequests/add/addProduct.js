var mysql = require('mysql');
const { config } = require("../../Database");

// adding product to DB
function addProduct(product, price, amount) {
  var con = mysql.createConnection(config); // creting mySQL DB connection
  con.connect(function (err) {
    if (err)
      throw err;
    console.log("Connected!");
    var sql = "INSERT INTO goods (product, price, amount) VALUES ?";
    var values = [[product, price, amount]];
    console.log('-------------------SQL' + sql);
    con.query(sql, [values], function (err, result) { // executing request
      if (err)
        throw err;
      console.log("1 record inserted");
      con.end(); // close connection
    });
  });
}
exports.addProduct = addProduct;
