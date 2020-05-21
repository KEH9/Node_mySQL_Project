const { Database, config } = require("./../../Database");

/* getting from DB: 
* all orders, 
* one order by it's ID, 
* many orders by customer's ID, 
* many orders by customer's name. 
* Arguments:
* res - response to AJAX POST
* id - search by order ID
* customer_id - search by customer id
* customer_name - search by customer name
*/
function getOrders(res, id, customer_id, customer_name) {
  let database = new Database(config);
  if (!id && !customer_id && !customer_name) { // get all orders
    database.query('SELECT * FROM orders')
      .then(result => { // then response to html
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
  else if (id && !customer_id && !customer_name) { // find orders by id
    console.log('!!!!!!!!!!!!!!!!!!!!' + id);
    let sql = "SELECT * FROM orders WHERE id = ?";
    database.query(sql, [id])
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
  else if (!id && customer_id && !customer_name) { // find ordrs by customer id
    console.log(customer_id);
    let sql = "SELECT * FROM orders WHERE customer_id = ?";
    database.query(sql, [customer_id])
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
  else if (!id && !customer_id && customer_name) { // find ordrs by customer name
    console.log(customer_name);
    let sql = "SELECT * FROM orders WHERE customer_name = ?";
    database.query(sql, [customer_name])
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
}
exports.getOrders = getOrders;
