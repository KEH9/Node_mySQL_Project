const { Database, config } = require("./../../Database");

function getProductByID(res, id) {
  let database = new Database(config);
  var sql = "SELECT * FROM goods WHERE id = ?";
  var values = id;
  database.query(sql, values)
    .then(result => {
      console.log('PROMISE RESULT PRODUCT BY ID!!!  ' + result);
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
exports.getProductByID = getProductByID;
