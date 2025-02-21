var mysql = require('mysql');
const { config } = require("../../Database");

// updting product amount in DB
function updateProductAmount(product, amount) {
  var con = mysql.createConnection(config);  // db request config
  con.connect(function (err) {
    if (err) // handle the error
      throw err;
    console.log("Connected!");
    console.log("Amount: ");
    console.log(amount);
    var sql = "UPDATE goods SET amount = ? WHERE product = ?";
    var values = [amount, product];
    console.log('-------------------SQL' + sql);
    console.log(values);
    con.query(sql, values, function (err, result) { // db request 
      if (err)
        throw err;
      console.log("1 record updated");
      con.end();
    });
  });
}

exports.updateProductAmount = updateProductAmount;

