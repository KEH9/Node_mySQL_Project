const { Database, config } = require("./../../Database");

function addProductToOrdesProducts(res, order_id, product_id, product_name, amount, price, sum) {
  let database = new Database(config);
  var sql = "INSERT INTO orders_products (order_id, product_id, product_name, amount, price, sum) VALUES ?";
  var values = [[order_id, product_id, product_name, amount, price, sum]];
  console.log('CHECK orders_products!!!!!');
  console.log(values);
  database.query(sql, [values])
    .then(result => {
      console.log('PROMISE RESULT orders_products!!!  ' + result);
      console.log(result);
      res.send("New order added!");
      return database.close();
    }, err => {
      return database.close().then(() => { throw err; });
    });
}
exports.addProductToOrdesProducts = addProductToOrdesProducts;
