const { Database, config } = require("./../../Database");
function getProductByName(res, product) {
  let database = new Database(config);
  console.log('product' + product);
  var sql = "SELECT * FROM goods WHERE product = ?";
  var values = product;
  database.query(sql, values)
    .then(result => {
      console.log('PROMISE RESULT PRODUCT BY NAME!!!  ' + result);
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
exports.getProductByName = getProductByName;
