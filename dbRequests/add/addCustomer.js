var mysql = require('mysql');
const { config } = require("../../Database");

function addCustomer(name, address) {
  var con = mysql.createConnection(config);
  con.connect(function (err) {
    if (err)
      throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [[name, address]];
    console.log('-------------------SQL' + sql);
    con.query(sql, [values], function (err, result) {
      if (err)
        throw err;
      console.log("1 record inserted");
      con.end();
    });
  });
}
exports.addCustomer = addCustomer;
