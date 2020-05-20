var mysql = require('mysql');
const { config } = require("../../Database");

// adding customer to DB
function addCustomer(name, address) {
  var con = mysql.createConnection(config);
  con.connect(function (err) {
    if (err)
      throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [[name, address]];
    console.log('-------------------SQL' + sql);
    con.query(sql, [values], function (err, result) { // execute query
      if (err) // hanle error
        throw err; 
      console.log("1 record inserted");
      con.end(); // close connection
    });
  });
}
exports.addCustomer = addCustomer;
