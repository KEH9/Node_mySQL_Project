var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "256256ZZzz",
  database: "mydb"
});


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

let database = new Database(config);


var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "\\" + "main.html" );
})



app.post('/customer_send', urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  
  console.log('req.body.name = ' + req.body.name);
  name = req.body.name;
  address = req.body.address;
  addCustomer(name, address);
  response = {
     name:req.body.name,
     address:req.body.address
  };
  console.log(response);
  res.end(); //JSON.stringify(response)
})


app.post('/customers_request', function (req, res) {

  console.log('---------------CLICKED!----------------');
  // console.log(req.headers);
  // let customers = getCustomers();
  // console.log('CUSTOMERS RCIEVED:   ' + customers);
  // res.send('just text');
  getCustomers(res);

})


var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})




function addCustomer (name, address) {
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    
    var values = [[name, address]];
    console.log('-------------------SQL' + sql);

    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}


function getCustomers (res) {

  database.query( 'SELECT * FROM customers' )
  .then( result => {
    console.log('PROMISE RESULT   ' + result);
    console.log('nodemon!');
    res.send(result);
    return database.close(); 
  }, err => {
    return database.close().then( () => { throw err; } )
  } ).catch( err => {
    // handle the error
    console.log(err);
  } );
  

  // console.log('-----CUST------' + cust);

  // return cust;

}

// http.createServer(function (req, res) {
//   fs.readFile('main.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });


  
  
  // con.connect(function(err) {
  //   if (err) throw err;
  //   con.query("SELECT * FROM customers", function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result);
  //   });
  // });
  


// }).listen(3000);   


// setTimeout(() => {process.exit();}, 1000)