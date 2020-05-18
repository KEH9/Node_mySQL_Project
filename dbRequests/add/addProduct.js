var mysql = require('mysql');
const { config } = require("../../Database");

function addProduct(product, price, amount) {
  var con = mysql.createConnection(config);
  con.connect(function (err) {
    if (err)
      throw err;
    console.log("Connected!");
    var sql = "INSERT INTO goods (product, price, amount) VALUES ?";
    var values = [[product, price, amount]];
    console.log('-------------------SQL' + sql);
    con.query(sql, [values], function (err, result) {
      if (err)
        throw err;
      console.log("1 record inserted");
      con.end();
    });
  });
}
exports.addProduct = addProduct;
