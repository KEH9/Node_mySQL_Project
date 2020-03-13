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


var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "\\" + "main.html" );
})



app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   
   console.log('req.body.name = ' + req.body.name);
   name = req.body.name;
   address = req.body.address;
   console.log('-------------------------------' + name + '///' + address);
   addCustomer(name, address);
   response = {
      name:req.body.name,
      address:req.body.address
   };
   console.log(response);



   res.end(JSON.stringify(response));
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