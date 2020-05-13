import {getCustomerByID, fillCustomerName} from './dbGet/getCustomerByID.mjs';
import {getCustomerByName} from './dbGet/getCustomerByName.mjs';
import {getProductsByName} from './dbGet/getProductsByName.mjs';
import {getFullListOfProducts} from './dbGet/getFullListOfProducts.mjs';
import {getCustomersByName} from './dbGet/getCustomersByName.mjs';
import {getCustomersByAddress} from './dbGet/getCustomersByAddress.mjs';
import {getFullListOfCustomers} from './dbGet/getFullListOfCustomers.mjs';





import {addNewCustomerHTMLSide} from  './customers/addNewCustomerHTMLSide.mjs';
import {addNewProductHTMLSide} from './goods/addNewProductHTMLSide.mjs';





import { 
  catchEnterOnProductID, 
  catchEnterOnProductName, 
  catchEnterOnAmount
} from './sharedFunctions/catchEnterOn.mjs';


//-------------------------- CATCH ENTER KEYDOWN --------------------------

//--------------------------------- CUSTOMERS ---------------------------------

// customers add new customer, field = name
const nodeName = document.getElementById("name");
nodeName.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      document.getElementById("address").focus();
    }
});

// customers add new customer, field = address
const nodeAddress = document.getElementById("address");
nodeAddress.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      addNewCustomerHTMLSide();
    }
});


// customers find customer by name
const nodeFCBN = document.getElementById("textFCBN");
nodeFCBN.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      getCustomersByName();
    }
});

// customers find customer by address
const nodeFCBA = document.getElementById("textFCBA");
nodeFCBA.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      getCustomersByAddress();
    }
});




//--------------------------------- GOODS ---------------------------------

// goods add new product, field = product
const nodeProduct = document.getElementById("product");
nodeProduct.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      document.getElementById("price").focus();
    }
});

// goods add new product, field = price
const nodePrice = document.getElementById("price");
nodePrice.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      document.getElementById("amount").focus();
    }
});

// goods add new product, field = amount
const nodeAmount = document.getElementById("amount");
nodeAmount.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      addNewProductHTMLSide();
    }
});


// goods find products
const nodeTextFP = document.getElementById("textFP");
nodeTextFP.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      getProductsByName(e);
    }
});



//--------------------------------- ORDERS ---------------------------------

// orders, onEnter field = customer ID
const nodeCustomerID = document.getElementById("CustomerID");
nodeCustomerID.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      let customerID = nodeCustomerID.value;
      getCustomerByID(customerID, fillCustomerName);
    }

});


// orders, onEnter field = customer name
const nodeCustomerName = document.getElementById("CustomerName");
nodeCustomerName.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      let customerNameInOrders = nodeCustomerName.value;
      getCustomerByName(customerNameInOrders);
    }
});


// orders, onEnter field = product ID
catchEnterOnProductID(1);


// orders, onEnter field = product name
catchEnterOnProductName(1);


// orders, onEnter field = amount
catchEnterOnAmount(1);


//-------------------------- CATCH ENTER KEYDOWN (end) --------------------------



//-------------------------- CATCH BUTTON CLICKS --------------------------

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




//-------------------------- CATCH BUTTON CLICKS (end) --------------------------



