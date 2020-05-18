const { Database, config } = require("./../../Database");

function getCustomerByName(res, name) {
  let database = new Database(config);
  var sql = "SELECT * FROM customers WHERE name = ?";
  var values = name;
  database.query(sql, values)
    .then(result => {
      console.log('PROMISE RESULT CUSTOMER BY NAME Order Form!!!  ' + result);
      console.log(result);
      res.send(result);
      return database.close();
    }, err => {
      return database.close().then(() => { throw err; });
    }).catch(err => {
      // handle the error
      console.log(err);
    });
}
exports.getCustomerByName = getCustomerByName;
