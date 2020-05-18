const { addProductToOrdesProducts } = require("./addProductToOrdesProducts");
const { updateProductAmount } = require("../update/updateProductAmount"); 
const { Database, config } = require("../../Database"); 


function addOrder(res, customer_name, customer_address, result, customer_id, total, productsArray) {
  let resultBoolean = (result.length > 0);
  if (resultBoolean) { //--------------  ADD NEW ORDER INTO TABLE "ORDERS" --------------
    let database = new Database(config);
    database.query("SHOW TABLE STATUS LIKE 'orders'")
      .then(result => {
        console.log('PROMISE RESULT TABLE STATUS!!!  ' + result);
        console.log(result);
        console.log(result[0].Auto_increment);
        let orderNumber = result[0].Auto_increment;
        database.close();
        return orderNumber;
      }, err => {
        return database.close().then(() => { throw err; });
      })
      .then(result => {
        console.log('result = ');
        console.log(result);
        console.log(customer_id, customer_name, customer_address, total);
        let database = new Database(config);
        var sql = "INSERT INTO orders (customer_id, customer_name, customer_address, total) VALUES ?";
        var values = [[customer_id, customer_name, customer_address, total]];
        database.query(sql, [values]);
        return result;
      }, err => {
        return database.close().then(() => { throw err; });
      })
      .then(result => {
        console.log('ORDER ADDED!!!  ' + result);
        return result;
      })
      .then(result => {
        //--------------  PUT ALL PRODUCTS TO orders_products --------------
        let order_id = result;
        for (let i = 0; i < productsArray.length; i++) {
          let product_id = productsArray[i].product_id;
          let product_name = productsArray[i].product_name;
          let amount = productsArray[i].amount;
          let price = productsArray[i].price;
          let sum = productsArray[i].sum;
          let at_store = productsArray[i].at_store;
          let newAmount = (+at_store - +amount);
          addProductToOrdesProducts(res, order_id, product_id, product_name, amount, price, sum);
          updateProductAmount(product_name, +newAmount);
        }
      })
      .catch(err => {
        // handle the error
        console.log(err);
      });
  }
  else {
    console.log('there is no such customer in base!');
    res.send('there is no such customer in base!');
  }
}
exports.addOrder = addOrder;
