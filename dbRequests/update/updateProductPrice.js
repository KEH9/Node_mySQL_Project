var mysql = require('mysql');
const { config } = require("../../Database");

function updateProductPrice(product, price) {
  var con = mysql.createConnection(config);
  con.connect(function (err) {
    if (err)
      throw err;
    console.log("Connected!");
    var sql = "UPDATE goods SET price = ? WHERE product = ?";
    var values = [price, product];
    console.log('-------------------SQL' + sql);
    console.log(values);
    con.query(sql, values, function (err, result) {
      if (err)
        throw err;
      console.log("1 record updated");
      con.end();
    });
  });
}
exports.updateProductPrice = updateProductPrice;
