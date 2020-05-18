const { Database, config } = require("./../../Database");

/* Arguments:
* res - response to AJAX POST
* product - search by product
*/
function getOrderProducts(res, order_id) {
  let database = new Database(config);
  console.log('order_id');
  console.log(order_id);
  let sql = "SELECT * FROM orders_products WHERE order_id = ?";
  database.query(sql, [order_id])
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
exports.getOrderProducts = getOrderProducts;
