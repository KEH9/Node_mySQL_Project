const { Database, config } = require("./../../Database");

/* getting all products or many products by patr of it's name from DB  
* Arguments:
* res - response to AJAX POST
* product - search by product
*/
function getProducts(res, product) {

  let database = new Database(config); // db request config
  console.log('product ' + product);
  if (!product) { // getting all produts
    database.query('SELECT * FROM goods')  // db request
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
  else if (product) { // getting many products by patr of it's name
    console.log('product');
    console.log(product);
    let productSQL = '%' + product + '%';
    let sql = "SELECT * FROM goods WHERE product LIKE ?"; 
    database.query(sql, [productSQL])  // db request
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
