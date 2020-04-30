var http = require('http');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var config = {
  host: "localhost",
  user: "root",
  password: "256256ZZzz",
  database: "mydb"
};


class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}


var urlencodedParser = bodyParser.urlencoded({ extended: false })

//app.use(express.static('public'));
app.use("/public", express.static('./public/'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());




app.get('/', function (req, res) {
  res.sendFile('main.html', { root: path.join(__dirname) });
  // res.sendFile( __dirname + "\\" + "main.html" );
});


//-------------- POST ADD CUSTOMER --------------
app.post('/customer_add', urlencodedParser, function (req, res) {
  
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

  let name = req.body.name;
  let address = req.body.address;
  console.log('req.body.name = ' + name);
  console.log('req.body.address = ' + address);

  console.log('name.length = ' + name.length);
  console.log('address.length = ' + address.length);

  if ( name.length <= 3 ) {
    console.log('name length is too short!')
    res.send('Name should to be more than 3 letters!');
  } else if ( address.length <= 3 ) {
    console.log('address length is too short!')
    res.send('Address should to be more than 3 letters!');
  } else {
    checkCustomerInBase(res, name, address, checkCustomerForAddCustomerRequestCallback);
  }

});
//-------------- POST ADD CUSTOMER (end) --------------


//-------------- POST ADD PRODUCT --------------
app.post('/product_add', urlencodedParser, function (req, res) {
  
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

  let product = req.body.product;
  let price = req.body.price;
  let amount = req.body.amount;

  if ( product.length <= 3 ) {
    console.log('Product name length is too short!')
    res.send('Product name should to be more than 3 letters!');
  } else if ( price <= 0 ) {
    console.log('Price shoud to be positive!')
    res.send('Price shoud to be positive!');
  } else if ( amount <= 0 ) {
    console.log('Amount shoud to be positive!')
    res.send('Amount shoud to be positive!');
  } else {
    checkProductInBase(res, product, price, amount);
  }

});
//-------------- POST ADD PRODUCT (end) --------------



//-------------- POST GET ALL CUSTOMERS REQUEST --------------
app.post('/customers_request', function (req, res) {

  console.log('---------------CLICKED!----------------');
  getCustomers(res);

});
//-------------- POST GET ALL CUSTOMERS REQUEST (end) --------------


//-------------- POST GET CUSTOMERS BY NAME REQUEST --------------
app.post('/customers_find_by_name', function (req, res) {

  console.log('--------------- GCBN CLICKED! ----------------');
  let name = req.body.name;
  console.log(name);
  getCustomers(res, name);
});
//-------------- POST GET CUSTOMERS BY NAME REQUEST (end) --------------


//-------------- POST GET CUSTOMERS BY ADDRESS REQUEST --------------
app.post('/customers_find_by_address', function (req, res) {

  console.log('--------------- GCBA CLICKED! ----------------');
  let address = req.body.address;
  console.log(address);
  getCustomers(res, null, address);
});
//-------------- POST GET CUSTOMERS BY ADDRESS REQUEST (end) --------------


//-------------- POST GET CUSTOMER BY ID REQUEST --------------
app.post('/customer_find_by_id', function (req, res) {

  console.log('--------------- GCBID CLICKED! ----------------');
  let id = req.body.id;
  console.log(id);
  getCustomerByID(res, id);
});
//-------------- POST GET CUSTOMER BY ID REQUEST (end) --------------


//-------------- POST GET CUSTOMER BY NAME REQUEST --------------
app.post('/customer_find_by_name', function (req, res) {

  console.log('--------------- GCBN orders form CLICKED! ----------------');
  let name = req.body.name;
  console.log(name);
  getCustomerByName(res, name);
});
//-------------- POST GET CUSTOMER BY NAME REQUEST (end) --------------





//-------------- POST GET PRODUCTS REQUEST --------------
app.post('/product_find', function (req, res) {

  console.log('--------------- FIND PRODUCT CLICKED! ----------------');
  let product = req.body.product;
  console.log(product);
  getProducts(res, product);
});
//-------------- POST GET PRODUCTS REQUEST (end) --------------


//-------------- POST GET ALL PRODUCTS REQUEST --------------
app.post('/products_request', function (req, res) {

  console.log('---------------CLICKED!----------------');
  getProducts(res);

});
//-------------- POST GET ALL PRODUCTS REQUEST (end) --------------


//-------------- POST GET PRODUCT BY ID REQUEST --------------
app.post('/product_find_by_id', function (req, res) {

  console.log('--------------- GPBID CLICKED! ----------------');
  let id = req.body.id;
  console.log(id);
  getProductByID(res, id);
});
//-------------- POST GET PRODUCT BY ID REQUEST (end) --------------


//-------------- POST GET PRODUCT BY NAME REQUEST --------------
app.post('/product_find_by_name', function (req, res) {

  console.log('--------------- GPBN CLICKED! ----------------');
  let product = req.body.product;
  console.log(product);
  getProductByName(res, product);
});
//-------------- POST GET PRODUCT BY NAME REQUEST (end) --------------

//-------------- POST ADD ORDER --------------
app.post('/order_add', urlencodedParser, function (req, res) {

  let customer_id = req.body.customer_id;
  let customer_name = req.body.customer_name;
  let customer_address = req.body.customer_address;
  let total = req.body.total;
  let productsArray = req.body.products;
  console.log('req.body.customer_id = ' + customer_id);
  console.log('req.body.customer_name = ' + customer_name);
  console.log('req.body.customer_address = ' + customer_address);
  console.log('req.body.total = ' + total);
  console.log('req.body.products = ' + productsArray);
  console.log(productsArray);

  // if ( name.length <= 3 ) {
  //   console.log('name length is too short!')
  //   res.send('Name should to be more than 3 letters!');
  // } else if ( address.length <= 3 ) {
  //   console.log('address length is too short!')
  //   res.send('Address should to be more than 3 letters!');
  // } else {
    addOrderToDB(res, customer_id, customer_name, customer_address, total, productsArray);
  // }

});
//-------------- POST ADD ORDER (end) --------------


//-------------- POST GET ALL ORDERS REQUEST --------------
app.post('/orders_request', function (req, res) {

  console.log('---------------CLICKED!----------------');
  getOrders(res);

});
//-------------- POST GET ALL ORDERS REQUEST (end) --------------


//-------------- POST GET ORDERS BY ID --------------
app.post('/orders_find_by_id', function (req, res) {

  console.log('--------------- FOBID CLICKED! ----------------');
  let id = req.body.id;
  console.log(id);
  getOrders(res, id);
});
//-------------- POST GET ORDERS BY ID (end) --------------

//-------------- POST GET ORDERS BY CUSTOMER ID --------------
app.post('/orders_find_by_customer_id', function (req, res) {

  console.log('--------------- FOBCID CLICKED! ----------------');
  let id = req.body.id;
  console.log(id);
  getOrders(res, null, id);
});
//-------------- POST GET ORDERS BY CUSTOMER ID (end) --------------

//-------------- POST GET ORDERS BY CUSTOMER NAME --------------
app.post('/orders_find_by_customer_name', function (req, res) {

  console.log('--------------- FOBCN CLICKED! ----------------');
  let name = req.body.name;
  console.log(name);
  getOrders(res, null, null, name);
});
//-------------- POST GET ORDERS BY CUSTOMER NAME (end) --------------






var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})



function checkCustomerInBase (res, name, address, callback, customer_id, total, productsArray) {

  let database = new Database(config);

  let sql = "SELECT * FROM customers WHERE name = ? AND address = ?";
  database.query( sql , [name, address])
  .then( result => {
    console.log('----------------------- CHECK RESULT ---------------------');
    console.log(result);
    callback(res, name, address, result, customer_id, total, productsArray);
    return database.close(); 
  }, err => {
    return database.close().then( () => { throw err; } )
  } ).catch( err => {
    // handle the error
    console.log(err);
  } );


  return true;
}

function checkCustomerForAddCustomerRequestCallback (res, name, address, result) {
  let resultBoolean = ( result.length > 0 )
  if (resultBoolean) {
    console.log('customer is already in base!')
    res.send('Customer is already in base!');
  } else {
    addCustomer(name, address);
    res.send('New customer added!');     
  }
}



function checkProductInBase (res, product, price, amount) {

  let database = new Database(config);

  console.log('--------------- checkProductInBase -------------------');
  console.log('product = ' + product);
  console.log('price = ' + price);
  console.log('amount = ' + amount);
  let sql = "SELECT * FROM goods WHERE product = ?";
  database.query( sql , [product])
  .then( result => {
    console.log('----------------------- CHECK RESULT (PRODUCT) ---------------------');
    console.log(result);
    let resultBoolean = ( result.length > 0 )
    if (resultBoolean) {
        console.log('product is already in base!')
        // console.log(result);
        // console.log(result[0].amount);

        let newAmount = +amount + +result[0].amount; 
        updateProductAmount(product, newAmount);
        updateProductPrice(product, price);
        res.send('Product is already in base! Amount at our store and price are updted!');
      } else {
        addProduct(product, price, amount);
        res.send('New product added!');     
      }
    return database.close(); 
  }, err => {
    return database.close().then( () => { throw err; } )
  } ).catch( err => {
    // handle the error
    console.log(err);
  } );


  return true;
}




function addCustomer (name, address) {
  
  var con = mysql.createConnection(config);

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [[name, address]];
    console.log('-------------------SQL' + sql);

    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      con.end();
    });
  });


}



function addProduct (product, price, amount) {
  
  var con = mysql.createConnection(config);

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO goods (product, price, amount) VALUES ?";
    
    var values = [[product, price, amount]];
    console.log('-------------------SQL' + sql);

    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      con.end();
    });
  });
}



function updateProductAmount (product, amount) {
  
  var con = mysql.createConnection(config);

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "UPDATE goods SET amount = ? WHERE product = ?";
    
    var values = [amount, product];
    console.log('-------------------SQL' + sql);
    console.log(values);

    con.query(sql, values, function (err, result) {
      if (err) throw err;
      console.log("1 record updated");
      con.end();
    });
  });


}

function updateProductPrice (product, price) {
  
  var con = mysql.createConnection(config);

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "UPDATE goods SET price = ? WHERE product = ?";
    
    var values = [price, product];
    console.log('-------------------SQL' + sql);
    console.log(values);

    con.query(sql, values, function (err, result) {
      if (err) throw err;
      console.log("1 record updated");
      con.end();
    });
  });


}







//--------------  GET CUSTOMERS FUNCTION --------------
/* Arguments:
* res - response to AJAX POST
* name - search by name
* address - search by adress
*/
function getCustomers (res, name, address) {

  let database = new Database(config);

console.log('Address ' + address)

  if ( !name && !address ) {
    database.query( 'SELECT * FROM customers' )
    .then( result => {
      console.log('PROMISE RESULT   ' + result);
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
  } else if ( name && !address ) {
    console.log('name && !address');
    console.log(name);
    let nameSQL = '%' + name + '%';
    let sql = "SELECT * FROM customers WHERE name LIKE ?";
    database.query( sql , [nameSQL])
    .then( result => {
      console.log(result);
      console.log('PROMISE RESULT   ' + result);
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
  } else if ( !name && address ) {
    console.log('name && !address');
    console.log(address);
    let addressSQL = '%' + address + '%';
    let sql = "SELECT * FROM customers WHERE address LIKE ?";
    database.query( sql , [addressSQL])
    .then( result => {
      console.log(result);
      console.log('PROMISE RESULT   ' + result);
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
  }
}
//--------------  GET CUSTOMERS FUNCTION (end) --------------



//--------------  GET PRODUCTS FUNCTION --------------
/* Arguments:
* res - response to AJAX POST
* product - search by product
*/
function getProducts (res, product) {

  let database = new Database(config);

console.log('product ' + product)

  if ( !product ) {
    database.query( 'SELECT * FROM goods' )
    .then( result => {
      console.log('PROMISE RESULT PRODUTS!!!  ' + result);
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
  } else if ( product ) {
    console.log('product');
    console.log(product);
    let productSQL = '%' + product + '%';
    let sql = "SELECT * FROM goods WHERE product LIKE ?";
    database.query( sql , [productSQL])
    .then( result => {
      console.log(result);
      console.log('PROMISE RESULT   ' + result);
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
  }
}
//--------------  GET PRODUCTS FUNCTION (end) --------------



//--------------  GET CUSTOMER BY ID FUNCTION --------------
function getCustomerByID (res, id) {

  let database = new Database(config);

    var sql = "SELECT * FROM customers WHERE id = ?";    
    var values = id;
    database.query( sql, values )
    .then( result => {
      console.log('PROMISE RESULT CUSTOMER BY ID!!!  ' + result);
      console.log(result)
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
}
//--------------  GET CUSTOMER BY ID FUNCTION (end) --------------


//--------------  GET CUSTOMER BY NAME (Orders Form) --------------
function getCustomerByName (res, name) {

  let database = new Database(config);

    var sql = "SELECT * FROM customers WHERE name = ?";    
    var values = name;
    database.query( sql, values )
    .then( result => {
      console.log('PROMISE RESULT CUSTOMER BY NAME Order Form!!!  ' + result);
      console.log(result)
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
}
//--------------  GET CUSTOMER BY NAME (Orders Form) (end) --------------


//--------------  GET PRODUCT BY ID FUNCTION --------------
function getProductByID (res, id) {

  let database = new Database(config);

    var sql = "SELECT * FROM goods WHERE id = ?";    
    var values = id;
    database.query( sql, values )
    .then( result => {
      console.log('PROMISE RESULT PRODUCT BY ID!!!  ' + result);
      console.log(result)
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
}
//--------------  GET CUSTOMER BY ID FUNCTION (end) --------------


//--------------  GET PRODUCT BY NAME FUNCTION --------------
function getProductByName (res, product) {

  let database = new Database(config);

  console.log('product' + product);
    var sql = "SELECT * FROM goods WHERE product = ?";    
    var values = product;
    database.query( sql, values )
    .then( result => {
      console.log('PROMISE RESULT PRODUCT BY NAME!!!  ' + result);
      console.log(result)
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
}
//--------------  GET CUSTOMER BY NAME FUNCTION (end) --------------




//--------------  ADD NEW ORDER FUNCTION --------------
function addOrderToDB (res, customer_id, customer_name, customer_address, total, productsArray) {

  checkCustomerInBase(res, customer_name, customer_address, addOrder, customer_id, total, productsArray);
}

function addOrder (res, customer_name, customer_address, result, customer_id, total, productsArray) {

  let resultBoolean = ( result.length > 0 )
  if (resultBoolean) {    


    let database = new Database(config);
    database.query( "SHOW TABLE STATUS LIKE 'orders'" )
    .then( result => {
      console.log('PROMISE RESULT TABLE STATUS!!!  ' + result);
      console.log(result);
      console.log(result[0].Auto_increment);
      let orderNumber = result[0].Auto_increment;
      database.close();
      return orderNumber;
    }, err => {
      return database.close().then( () => { throw err; } )
    } )
    .then( result => {
      console.log('result = ');
      console.log(result);
      console.log(customer_id, customer_name, customer_address, total);

      let database = new Database(config);
      var sql = "INSERT INTO orders (customer_id, customer_name, customer_address, total) VALUES ?";
      var values = [[customer_id, customer_name, customer_address, total]];  
      database.query( sql, [values] )
      return result
    }, err => {
      return database.close().then( () => { throw err; } )
    } )
    .then( result => {
      console.log('ORDER ADDED!!!  ' + result);
      return result
    } )
    .then ( result => {
      let order_id = result;

      console.log('CHECK!!!');
      console.log(productsArray);

      for (let i = 0; i < productsArray.length; i++) {

        let database = new Database(config);

        let product_id = productsArray[i].product_id;
        let product_name = productsArray[i].product_name;
        let amount = productsArray[i].amount;
        let price = productsArray[i].price;
        let sum = productsArray[i].sum;

        var sql = "INSERT INTO orders_products (order_id, product_id, product_name, amount, price, sum) VALUES ?";    
        var values = [[order_id, product_id, product_name, amount, price, sum]];
        console.log('CHECK orders_products!!!!!');
        console.log(values);
        
        database.query( sql, [values] )
        .then( result => {
          console.log('PROMISE RESULT orders_products!!!  ' + result);
          console.log(result)
          res.send("ok"); // CHANGE!!
          return database.close(); 
        }, err => {
          return database.close().then( () => { throw err; } )
        } )


      }

      // START HERE
    })
    .catch( err => {
      // handle the error
      console.log(err);
    });
  
  } else {
    console.log('there is no such customer in base!')
    res.send('there is no such customer in base!');
  }


}

//--------------  ADD NEW ORDER FUNCTION (end) --------------


//--------------  GET ORDERS FUNCTION --------------
/* Arguments:
* res - response to AJAX POST
* id - search by order ID
* customer_id - search by customer id
* customer_name - search by customer name
*/
function getOrders (res, id, customer_id, customer_name) {

  let database = new Database(config);

  if ( !id && !customer_id && !customer_name ) {  // get all orders
    database.query( 'SELECT * FROM orders' )
    .then( result => {
      console.log('PROMISE RESULT   ' + result);
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
  } else if ( id && !customer_id && !customer_name ) { // find orders by id
    console.log('!!!!!!!!!!!!!!!!!!!!' + id);
    let sql = "SELECT * FROM orders WHERE id = ?";
    database.query( sql , [id])
    .then( result => {
      console.log(result);
      console.log('PROMISE RESULT   ' + result);
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
  } 
  else if ( !id && customer_id && !customer_name ) { // find ordrs by customer id
    console.log(customer_id);
    let sql = "SELECT * FROM orders WHERE customer_id = ?";
    database.query( sql , [customer_id])
    .then( result => {
      console.log(result);
      console.log('PROMISE RESULT   ' + result);
      res.send(result);
      return database.close(); 
    }, err => {
      return database.close().then( () => { throw err; } )
    } ).catch( err => {
      // handle the error
      console.log(err);
    } );
  } else if ( !id && !customer_id && customer_name ) { // find ordrs by customer name
  console.log(customer_name);
  let sql = "SELECT * FROM orders WHERE customer_name = ?";
  database.query( sql , [customer_name])
  .then( result => {
    console.log(result);
    console.log('PROMISE RESULT   ' + result);
    res.send(result);
    return database.close(); 
  }, err => {
    return database.close().then( () => { throw err; } )
  } ).catch( err => {
    // handle the error
    console.log(err);
  } );
}
}
//--------------  GET ORDERS FUNCTION (end) --------------


