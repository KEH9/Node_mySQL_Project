const { Database, config } = require("./../../Database");

/* getting all products which is corresponding to exact order 
* Arguments:
* res - response to AJAX POST
* product - search by product
*/
function getOrderProducts(res, order_id) {
  let database = new Database(config); // db request
  console.log('order_id');
  console.log(order_id);
  let sql = "SELECT * FROM orders_products WHERE order_id = ?";
  database.query(sql, [order_id])
    .then(result => { // then response to html
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
