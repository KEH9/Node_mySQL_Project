const { checkProductInBase } = require("./dbRequests/check/checkProductInBase");
const { checkCustomerInBase } = require("./dbRequests/check/checkCustomerInBase");
const { checkCustomerForAddCustomerRequestCallback } = require("./callbacks/checkCustomerForAddCustomerRequestCallback");
const { getCustomers } = require("./dbRequests/get/getCustomers");
const { getProducts } = require("./dbRequests/get/getProducts");
const { getCustomerByID } = require("./dbRequests/get/getCustomerByID");
const { getCustomerByName } = require("./dbRequests/get/getCustomerByName");
const { getProductByID } = require("./dbRequests/get/getProductByID");
const { getProductByName } = require("./dbRequests/get/getProductByName");
const { addOrderToDB } = require("./dbRequests/add/addOrderToDB");
const { getOrders } = require("./dbRequests/get/getOrders");
const { getOrderProducts } = require("./dbRequests/get/getOrderProducts");

const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use("/public", express.static('./public/'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());



//-------------- SEND INDEX PAGE --------------
app.get('/', function (req, res) {
  res.sendFile('main.html', { root: path.join(__dirname) });
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

  console.log('---------------customers_request CLICKED!----------------');
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

  console.log('---------------products_request CLICKED!----------------');
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

  addOrderToDB(res, customer_id, customer_name, customer_address, total, productsArray);

});
//-------------- POST ADD ORDER (end) --------------


//-------------- POST GET ALL ORDERS REQUEST --------------
app.post('/orders_request', function (req, res) {

  console.log('---------------orders_request CLICKED!----------------');
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


//-------------- POST GET ORDER PRODUCTS REQUEST --------------
app.post('/order_product_find', function (req, res) {

  console.log('--------------- FIND ORDER PRODUCT CLICKED! ----------------');
  let order_id = req.body.order_id;
  console.log(order_id);
  getOrderProducts(res, +order_id);
});
//-------------- POST GET ORDER PRODUCTS REQUEST (end) --------------



var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})


