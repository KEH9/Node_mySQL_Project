const { Database, config } = require("./../../Database");

// getting one product from DB by it's ID
function getProductByID(res, id) {
  let database = new Database(config); // db request
  var sql = "SELECT * FROM goods WHERE id = ?";
  var values = id;
  database.query(sql, values)
    .then(result => { // then response to HTML
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
