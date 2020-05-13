import { 
  catchEnterOnProductID, 
  catchEnterOnProductName, 
  catchEnterOnAmount
} from './sharedFunctions/catchEnterOn.mjs';

import {createTableFromJSON} from './sharedFunctions/createTableFromJSON.mjs';


//------------- INI -------------
const showDataOrders = document.getElementById('showDataOrders');
let productsInOrder = 1;

//------------- INI (end) -------------


//------------- MULTIPLY PRODUCTS IN THE ORDER -------------
document.getElementById('newProductToOrder').addEventListener("click", function(e){
  e.preventDefault();
  addProductToForm();
});

document.getElementById('deleteProductFromOrder').addEventListener("click", function(e){
  e.preventDefault();
  deleteProductFromOrder();
});


function addProductToForm () {
  productsInOrder += 1;
  let allProdctsContainer = document.getElementById('allProdctsContainer');

  let prodctContainer = document.createElement("div");
  prodctContainer.id = "prodctContainer" + productsInOrder;


  // product ID
  var nodeTextPID = document.createTextNode("Product ID: ");
  prodctContainer.appendChild(nodeTextPID);

  var nodeInputPID = document.createElement("input");   
  nodeInputPID.type = "number";
  nodeInputPID.name = "ProductID" + productsInOrder;
  nodeInputPID.id =  "ProductID" + productsInOrder;
  prodctContainer.appendChild(nodeInputPID);


  // product name
  var nodeTextPN = document.createTextNode(" Product name: ");
  prodctContainer.appendChild(nodeTextPN);

  var nodeInputPN = document.createElement("input");   
  nodeInputPN.type = "text";
  nodeInputPN.name = "ProductName" + productsInOrder;
  nodeInputPN.id =  "ProductName" + productsInOrder;
  prodctContainer.appendChild(nodeInputPN);
  

  // price
  var nodeTextPrice = document.createTextNode(" Price: ");
  prodctContainer.appendChild(nodeTextPrice);

  var nodeInputPrice = document.createElement("input");   
  nodeInputPrice.type = "number";
  nodeInputPrice.name = "price" + productsInOrder;
  nodeInputPrice.id =  "price" + productsInOrder;
  prodctContainer.appendChild(nodeInputPrice);
  

  // amount
  var nodeTextAmount = document.createTextNode(" Amount: ");
  prodctContainer.appendChild(nodeTextAmount);

  var nodeInputAmount = document.createElement("input");   
  nodeInputAmount.type = "number";
  nodeInputAmount.name = "amountOF" + productsInOrder;
  nodeInputAmount.id =  "amountOF" + productsInOrder;
  prodctContainer.appendChild(nodeInputAmount);
  
  // at store
  var nodeTextAtStore = document.createTextNode(" At store: ");
  prodctContainer.appendChild(nodeTextAtStore);

  var nodeInputAtStore = document.createElement("input");   
  nodeInputAtStore.type = "number";
  nodeInputAtStore.name = "atStore" + productsInOrder;
  nodeInputAtStore.id =  "atStore" + productsInOrder;
  prodctContainer.appendChild(nodeInputAtStore);
  
  // total
  var nodeTextTotal = document.createTextNode(" Total: ");
  prodctContainer.appendChild(nodeTextTotal);

  var nodeInputTotal = document.createElement("input");   
  nodeInputTotal.type = "number";
  nodeInputTotal.name = "total" + productsInOrder;
  nodeInputTotal.id =  "total" + productsInOrder;
  prodctContainer.appendChild(nodeInputTotal);
  

  allProdctsContainer.appendChild(prodctContainer);
  catchEnterOnProductID(productsInOrder);
  catchEnterOnProductName(productsInOrder);
  catchEnterOnAmount(productsInOrder);

}


function deleteProductFromOrder () {
  if (productsInOrder > 1) {
    let nodeName = "prodctContainer" + productsInOrder;
    document.getElementById(nodeName).remove();
    productsInOrder -= 1;
  }
}


//------------- MULTIPLY PRODUCTS IN THE ORDER (end) -------------


//------------- ADD NEW ORDER -------------
document.getElementById('addOrder').addEventListener("click", function(e){
  e.preventDefault();
  if (+document.getElementById("orderTotal").value <= 0) {
    alert("Order total should to be more than 0!")
  } else {
    addNewOrderHTMLSide();
  }
});


function addNewOrderHTMLSide () {

  let produtsAmount = (document.getElementById("allProdctsContainer").childElementCount + 1);
  let products = [];

  for(let i = 1; i <= produtsAmount; i++) {
    let new_orders_products = {
      product_id: document.getElementById("ProductID" + i).value,
      product_name: document.getElementById("ProductName" + i).value,
      amount: document.getElementById("amountOF" + i).value,
      price: document.getElementById("price" + i).value,
      sum: document.getElementById("total" + i).value,
      at_store: document.getElementById("atStore" + i).value
    }

    if (!new_orders_products.product_id) {
      alert('Field Product ID in the row ' + i + ' is empty!');
      return
    }
    if (!new_orders_products.product_name) {
      alert('Field Product name in the row ' + i + ' is empty!');
      return
    }
    if (!new_orders_products.amount) {
      alert('Field amount in the row ' + i + ' is empty!');
      return
    }
    if (!new_orders_products.price) {
      alert('Field price in the row ' + i + ' is empty!');
      return
    }
    if (!new_orders_products.sum) {
      alert('Field Total in the row ' + i + ' is empty!');
      return
    }
    if (!new_orders_products.at_store) {
      alert('Field at store in the row ' + i + ' is empty!');
      return
    }
    products.push(new_orders_products);

  }

  console.log(products);
  console.log('products');

  let newOrderForm = document.getElementById("newOrderForm");
  let newOrder = {
    customer_id: newOrderForm["CustomerID"].value,
    customer_name: newOrderForm["CustomerName"].value,
    customer_address: newOrderForm["CustomerAddress"].value,
    total: document.getElementById("orderTotal").value,
    products: products
  }

  console.log(newOrder);
  fetch('/order_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newOrder),
  })
    .then(function(response) {
      console.log('!!!!!!!!!!!!newOrder_add!!!!!!!!!!!!')
      if(response.ok) {
        console.log('ADD order Click was recorded');
        response.text().then(function(text) {
          console.log(text);
          if ( text == 'New order added!') {
            clearOrders();
          }
          alert(text);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};
//------------- ADD NEW ORDER (end) -------------


//------------- GET FULL LIST OF ORDERS -------------
const buttonGetOrders = document.getElementById('ordersRequest');
buttonGetOrders.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/orders_request', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          createTableFromJSON(jsonData, showDataOrders);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});
//------------- GET FULL LIST OF ORDERS (end) -------------




//------------- FIND ORDERS BY ID -------------
document.getElementById('buttonFOBOID').addEventListener("click", function(e){
  findOrdersByIdHTMLSide();
});

function findOrdersByIdHTMLSide () {

  let orderId = document.getElementById("textFOBOID").value;

  fetch('/orders_find_by_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: orderId}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FOBID Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          createTableFromJSON(jsonData, showDataOrders);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });


};

//------------- FIND ORDERS BY ID(end) -------------


//------------- FIND ORDERS BY CUSTOMER ID -------------
document.getElementById('buttonFOBCID').addEventListener("click", function(e){
  findOrdersByCustomerIdHTMLSide();
});

function findOrdersByCustomerIdHTMLSide () {

  let customerId = document.getElementById("textFOBCID").value;

  fetch('/orders_find_by_customer_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: customerId}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FOBCID Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          createTableFromJSON(jsonData, showDataOrders);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

//------------- FIND ORDERS BY CUSTOMER ID (end) -------------


//------------- FIND ORDERS BY CUSTOMER NAME -------------
document.getElementById('buttonFOBCN').addEventListener("click", function(e){
  findOrdersByCustomerNameHTMLSide();
});

function findOrdersByCustomerNameHTMLSide () {

  let customerName = document.getElementById("textFOBCN").value;

  fetch('/orders_find_by_customer_name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ name: customerName}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FOBCN Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          createTableFromJSON(jsonData, showDataOrders);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

//------------- FIND ORDERS BY CUSTOMER NAME (end) -------------


//------------- CLEAN ORDERS PAGE -------------
function clearOrders () {
  document.getElementById("newOrderForm").reset();
  document.getElementById("productsForNewOrderForm").reset();
  document.getElementById("allProdctsContainer").innerHTML = '';
}
//------------- CLEAN ORDERS PAGE (end) -------------



