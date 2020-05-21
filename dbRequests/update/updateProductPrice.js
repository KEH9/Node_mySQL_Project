var mysql = require('mysql');
const { config } = require("../../Database");

// updting product price in DB
function updateProductPrice(product, price) {
  var con = mysql.createConnection(config);  // db request config
  con.connect(function (err) {
    if (err)  // handle the error
      throw err;
    console.log("Connected!");
    var sql = "UPDATE goods SET price = ? WHERE product = ?";
    var values = [price, product];
    console.log('-------------------SQL' + sql);
    console.log(values);
    con.query(sql, values, function (err, result) {  // db request
      if (err)
        throw err;
      console.log("1 record updated");
      con.end();
    });
  });
}
exports.updateProductPrice = updateProductPrice;
