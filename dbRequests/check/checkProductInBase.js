const { addProduct } = require("../add/addProduct");
const { updateProductAmount } = require("../update/updateProductAmount");
const { updateProductPrice } = require("../update/updateProductPrice");
const { Database, config } = require("./../../Database");

// check is product exist in base when product are added or updated
function checkProductInBase(res, product, price, amount) {
  let database = new Database(config); // request to DB
  console.log('--------------- checkProductInBase -------------------');
  console.log('product = ' + product);
  console.log('price = ' + price);
  console.log('amount = ' + amount);
  let sql = "SELECT * FROM goods WHERE product = ?";
  database.query(sql, [product])
    .then(result => {
      console.log('----------------------- CHECK RESULT (PRODUCT) ---------------------');
      console.log(result);
      let resultBoolean = (result.length > 0);
      if (resultBoolean) { // if product exist in DB update price and amount
        console.log('product is already in base!');
        let newAmount = +amount + +result[0].amount;
        updateProductAmount(product, newAmount);
        updateProductPrice(product, price);
        res.send('Product is already in base! Amount at our store and price are updted!');
      }
      else { // if not exist add new product
        addProduct(product, price, amount);
        res.send('New product added!');
      }
      return database.close();
    }, err => {
      return database.close().then(() => { throw err; });
    }).catch(err => {
      // handle the error
      console.log(err);
    });
  return true;
}
exports.checkProductInBase = checkProductInBase;
