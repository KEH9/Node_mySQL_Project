//const { checkCustomerForAddCustomerRequestCallback } = require("../../callbacks/checkCustomerForAddCustomerRequestCallback");

const { Database, config } = require("./../../Database");

function checkCustomerInBase(res, name, address, callback, customer_id, total, productsArray) {
  let database = new Database(config);
  let sql = "SELECT * FROM customers WHERE name = ? AND address = ?";
  database.query(sql, [name, address])
    .then(result => {
      console.log('----------------------- CHECK RESULT ---------------------');
      console.log(result);
      console.log(callback);
      callback(res, name, address, result, customer_id, total, productsArray);
      return database.close();
    }, err => {
      return database.close().then(() => { throw err; });
    }).catch(err => {
      // handle the error
      console.log(err);
    });
  return true;
}
exports.checkCustomerInBase = checkCustomerInBase;


