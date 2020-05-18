const { Database, config } = require("./../../Database");

function getCustomerByID(res, id) {
  let database = new Database(config);
  var sql = "SELECT * FROM customers WHERE id = ?";
  var values = id;
  database.query(sql, values)
    .then(result => {
      console.log('PROMISE RESULT CUSTOMER BY ID!!!  ' + result);
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
exports.getCustomerByID = getCustomerByID;
