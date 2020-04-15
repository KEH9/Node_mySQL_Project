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
    checkCustomerInBase(res, name, address);
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







var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})



function checkCustomerInBase (res, name, address) {

  let database = new Database(config);

  console.log('--------------- checkCustomerInBase -------------------');
  console.log('name = ' + name);
  console.log('addres = ' + address);
  let sql = "SELECT * FROM customers WHERE name = ? AND address = ?";
  database.query( sql , [name, address])
  .then( result => {
    console.log('----------------------- CHECK RESULT ---------------------');
    console.log(result);
    let resultBoolean = ( result.length > 0 )
    if (resultBoolean) {
        console.log('customer is already in base!')
        res.send('Customer is already in base!');
      } else {
        addCustomer(name, address);
        res.send('New customer added!');     
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
//--------------  GET CUSTOMERS FUNCTION (end) --------------






