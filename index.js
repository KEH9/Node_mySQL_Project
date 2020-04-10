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






