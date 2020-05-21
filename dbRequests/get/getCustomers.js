const { Database, config } = require("./../../Database");

/* getting many customers by part of it's name, part of it's address or getting full list of customers 
* Arguments:
* res - response to AJAX POST
* name - search by name
* address - search by adress
*/
function getCustomers(res, name, address) {

  let database = new Database(config);
  console.log('Address ' + address);
  if (!name && !address) { // getting full list of customers
    database.query('SELECT * FROM customers')
      .then(result => {
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
  else if (name && !address) {  // getting list of customers by part of it's name
    console.log('name && !address');
    console.log(name);
    let nameSQL = '%' + name + '%';
    let sql = "SELECT * FROM customers WHERE name LIKE ?";
    database.query(sql, [nameSQL])
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
  else if (!name && address) {  // getting list of customers by part of it's address
    console.log('name && !address');
    console.log(address);
    let addressSQL = '%' + address + '%';
    let sql = "SELECT * FROM customers WHERE address LIKE ?";
    database.query(sql, [addressSQL])
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
exports.getCustomers = getCustomers;
