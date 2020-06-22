import {getCustomerByID, fillCustomerName} from './dbGet/getCustomerByID.mjs';
import {getCustomerByName} from './dbGet/getCustomerByName.mjs';
import {getProductsByName} from './dbGet/getProductsByName.mjs';
import {getFullListOfProducts} from './dbGet/getFullListOfProducts.mjs';
import {getCustomersByName} from './dbGet/getCustomersByName.mjs';
import {getCustomersByAddress} from './dbGet/getCustomersByAddress.mjs';
import {getFullListOfCustomers} from './dbGet/getFullListOfCustomers.mjs';
import {getFulListOfOrders} from './dbGet/getFulListOfOrders.mjs';
import {getOrderById} from './dbGet/getOrderById.mjs';
import {getOrdersByCustomerId} from './dbGet/getOrdersByCustomerId.mjs';
import {getOrdersByCustomerName} from './dbGet/getOrdersByCustomerName.mjs';

import {addNewCustomerHTMLSide} from  './customers/addNewCustomerHTMLSide.mjs';
import {addNewProductHTMLSide} from './goods/addNewProductHTMLSide.mjs';
import {addProductToForm} from './orders/addProductToForm.mjs';
import {deleteProductFromOrder} from './orders/deleteProductFromOrder.mjs';
import {addNewOrderHTMLSide} from './orders/addNewOrderHTMLSide.mjs';
import {showOrder} from './orders/showOrder.mjs';

import { 
  catchEnterOnProductID, 
  catchEnterOnProductName, 
  catchEnterOnAmount
} from './sharedFunctions/catchEnterOn.mjs';


//-------------------------- CATCH ENTER (or blur) KEYDOWN --------------------------

//--------------------------------- CUSTOMERS ---------------------------------

// customers add new customer, field = name
document.getElementById("name").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      document.getElementById("address").focus();
    }
});

// customers add new customer, field = address
document.getElementById("address").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      addNewCustomerHTMLSide();
    }
});


// customers find customer by name
document.getElementById("textFCBN").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      getCustomersByName();
    }
});

// customers find customer by address
document.getElementById("textFCBA").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      getCustomersByAddress();
    }
});


//--------------------------------- GOODS ---------------------------------

// goods add new product, field = product
document.getElementById("product").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      document.getElementById("price").focus();
    }
});

// goods add new product, field = price
document.getElementById("price").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      document.getElementById("amount").focus();
    }
});

// goods add new product, field = amount
document.getElementById("amount").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      addNewProductHTMLSide();
    }
});


// goods find products
document.getElementById("textFP").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      getProductsByName(e);
    }
});



//--------------------------------- ORDERS ---------------------------------

// add new order
// orders, onEnter field = customer ID
document.getElementById("CustomerID").addEventListener("keydown", function(e) {
  if (event.key === "Enter" && (document.getElementById("CustomerID").value !== '')) {
    e.preventDefault();
    let customerID = document.getElementById("CustomerID").value;
    getCustomerByID(customerID, fillCustomerName);
  }

});

// orders, onBlur field = customer ID
document.getElementById("CustomerID").addEventListener("blur", function(e) {
  if (document.getElementById("CustomerID").value !== '') {
    let customerID = document.getElementById("CustomerID").value;
    getCustomerByID(customerID, fillCustomerName);
  }
});


// orders, onEnter field = customer name
document.getElementById("CustomerName").addEventListener("keydown", function(e) {
  if (event.key === "Enter" && document.getElementById("CustomerName").value != '') {
    e.preventDefault();
    let customerNameInOrders = document.getElementById("CustomerName").value;
    getCustomerByName(customerNameInOrders);
  }
});

// orders, onBlur field = customer name
document.getElementById("CustomerName").addEventListener("blur", function(e) {
  if (document.getElementById("CustomerName").value !== '') {
    let customerNameInOrders = document.getElementById("CustomerName").value;
    getCustomerByName(customerNameInOrders);
  }
});



// orders, onEnter field = product ID
catchEnterOnProductID(1);


// orders, onEnter field = product name
catchEnterOnProductName(1);


// orders, onEnter field = amount
catchEnterOnAmount(1);


// find orders
// orders, onEnter field = order ID
document.getElementById("textFOBOID").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      getOrderById();
    }
});

// orders, onEnter field = customer ID
document.getElementById("textFOBCID").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      getOrdersByCustomerId();
    }
});

// orders, onEnter field = customer name
document.getElementById("textFOBCN").addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      getOrdersByCustomerName();
    }
});


//-------------------------- CATCH ENTER (or blur) KEYDOWN (end) --------------------------



//-------------------------- CATCH BUTTON CLICKS --------------------------
//--------------------------------- WELLCOME SCREEN ---------------------------------
document.getElementById('wellcomeClose').addEventListener("click", function(e){
  e.preventDefault();
  let wellcomePage = document.getElementById('wellcome');
  wellcomePage.classList.add('div-fadeout');
  setTimeout(() => {wellcomePage.parentNode.removeChild(wellcomePage)}, 500);
});

//--------------------------------- CUSTOMERS ---------------------------------
// add new customer
document.getElementById('newCustomer').addEventListener("click", function(e){
  e.preventDefault();
  addNewCustomerHTMLSide();
});

// get customers by name
document.getElementById('buttonFCBN').addEventListener("click", function(e){
  getCustomersByName();
});

// get customers by address
document.getElementById('buttonFCBA').addEventListener("click", function(e){
  getCustomersByAddress();
});

// get Full List Of Customers
const button = document.getElementById('customersRequest');
button.addEventListener('click', function(e) {
  e.preventDefault();
  getFullListOfCustomers();
});


//--------------------------------- GOODS ---------------------------------

// GET PRODUCTS BY NAME
document.getElementById('buttonFP').addEventListener("click", function (e) {
  getProductsByName(e);
} );


// ADD NEW PRODUCT
document.getElementById('newProduct').addEventListener("click", function(e){
  e.preventDefault();
  addNewProductHTMLSide();
});

// get Full List Of Products
const buttonPR = document.getElementById('productsRequest');
buttonPR.addEventListener('click', function(e) {
  getFullListOfProducts();
});


//--------------------------------- ORDERS ---------------------------------
// MULTIPLY PRODUCTS IN THE ORDER
document.getElementById('newProductToOrder').addEventListener("click", function(e){
  e.preventDefault();
  addProductToForm();
});

// DELETE PRODUCT IN THE ORDER
document.getElementById('deleteProductFromOrder').addEventListener("click", function(e){
  e.preventDefault();
  deleteProductFromOrder();
});

// ADD NEW ORDER
document.getElementById('addOrder').addEventListener("click", function(e){
  e.preventDefault();
  addNewOrderHTMLSide();
});

// GET FULL LIST OF ORDERS 
document.getElementById('ordersRequest').addEventListener("click", function(e){
  e.preventDefault();
  getFulListOfOrders();
});

// GET FULL LIST OF ORDERS 
document.getElementById('buttonFOBOID').addEventListener("click", function(e){
  e.preventDefault();
  getOrderById();
});

// FIND ORDERS BY CUSTOMER ID
document.getElementById('buttonFOBCID').addEventListener("click", function(e){
  getOrdersByCustomerId();
});

// FIND ORDERS BY CUSTOMER NAME
document.getElementById('buttonFOBCN').addEventListener("click", function(e){
  getOrdersByCustomerName();
});

// show order
document.getElementById("showDataOrders").addEventListener("click", function(e) {
  e.preventDefault();
  showOrder(e)
});


//-------------------------- CATCH BUTTON CLICKS (end) --------------------------



