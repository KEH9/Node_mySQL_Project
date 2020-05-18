const { Database, config } = require("./../../Database");

/* Arguments:
* res - response to AJAX POST
* name - search by name
* address - search by adress
*/
function getCustomers(res, name, address) {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!Database');
  console.log(Database);
  console.log(config);
  let database = new Database(config);
  console.log('Address ' + address);
  if (!name && !address) {
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
  else if (name && !address) {
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
  else if (!name && address) {
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
