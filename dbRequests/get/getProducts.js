const { Database, config } = require("./../../Database");

/* Arguments:
* res - response to AJAX POST
* product - search by product
*/
function getProducts(res, product) {
  let database = new Database(config);
  console.log('product ' + product);
  if (!product) {
    database.query('SELECT * FROM goods')
      .then(result => {
        console.log('PROMISE RESULT PRODUTS!!!  ' + result);
        res.send(result);
        return database.close();
      }, err => {
        return database.close().then(() => { throw err; });
      }).catch(err => {
        // handle the error
        console.log(err);
      });
  }
  else if (product) {
    console.log('product');
    console.log(product);
    let productSQL = '%' + product + '%';
    let sql = "SELECT * FROM goods WHERE product LIKE ?";
    database.query(sql, [productSQL])
      .then(result => {
        console.log(result);
        console.log('PROMISE RESULT   ' + result);
        res.send(result);
        return database.close();
      }, err => {
        return database.close().then(() => { throw err; });
      }).catch(err => {
        // handle the error
        console.log(err);
      });
  }
}
exports.getProducts = getProducts;
