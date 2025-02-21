import {getProductByID, fillProductName} from '../dbGet/getProductByID.mjs';
import {getProductByName, fillProductID} from '../dbGet/getProductByName.mjs';

// add handler for keydown event in field 'product ID' in form 'productsForNewOrderForm'
export function catchEnterOnProductID (productNumber) {
  let nodeProductID = document.getElementById("ProductID" + productNumber);
  nodeProductID.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      productIDEvents(e);
    }
  });

  nodeProductID.addEventListener("blur", function(e) {
    if (!(nodeProductID.classList.contains('no-blur-event')) && (nodeProductID !== '')) {
      productIDEvents(e);
    }
  });

  function productIDEvents (e) {
    let productIDInOrders = nodeProductID.value;
    // check if this product is already exist in this form
    let i = 1;
    let node = document.getElementById("ProductID" + i)
    let exist = false;

    while (!!node) {
      if (node.value == productIDInOrders && i !== productNumber && nodeProductID.value !== '') {
        alert('this product is already exist in this order!')
        exist = true;
        nodeProductID.value = '';
      }
      i++;
      node = document.getElementById("ProductID" + i)
    }

    if (!exist && (nodeProductID.value !== '')) { // if this is a new product for this form then 
      // get this product fron DB and fill the form
      getProductByID(productIDInOrders, fillProductName, productNumber);
    }
  }
}


// add handler for keydown event in field 'product name' in form 'productsForNewOrderForm'
export function catchEnterOnProductName (productNumber) {
  let nodeProductName = document.getElementById("ProductName" + productNumber);
  nodeProductName.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      productNameEvents(e);
    }
  });

  nodeProductName.addEventListener("blur", function(e) {
    if (!(nodeProductName.classList.contains('no-blur-event')) && (nodeProductName !== '')) {
      productNameEvents(e);
    }
  });

  function productNameEvents (e) {
    let productNameInOrders = nodeProductName.value;

    // check if this product is already exist in this form
    let i = 1;
    let node = document.getElementById("ProductName" + i)
    let exist = false;

    while (!!node) {
      if (node.value == productNameInOrders && i !== productNumber && nodeProductName.value !== '') {
        alert('this product is already exist in this order!')
        exist = true;
        nodeProductName.value = '';
      }
      i++;
      node = document.getElementById("ProductName" + i)
    }

    if (!exist && (nodeProductName.value !== '')) { // if this is a new order for this form then 
      // get this product fron DB and fill the form
      getProductByName(productNameInOrders, fillProductID, productNumber);
    }

  }
};


// add handler for keydown event in field 'product amount' in form 'productsForNewOrderForm'
export function catchEnterOnAmount (productNumber) {
  let nodeAmountOF = document.getElementById("amountOF" + productNumber);
  nodeAmountOF.addEventListener("keydown", function(e) {
      if (event.key === "Enter") {
        e.preventDefault();
        amountOFEvents(e);
      }
  });

  nodeAmountOF.addEventListener("blur", function(e) {
    if (!(nodeAmountOF.classList.contains('no-blur-event')) && (nodeAmountOF !== '')) {
      amountOFEvents(e);
    }
  });


  function amountOFEvents (e) {
    // collecting information on this product
    let productName = document.getElementById("ProductName" + productNumber).value;
    let productAmount = document.getElementById("amountOF" + productNumber).value;
    let productAtStore = document.getElementById("atStore" + productNumber).value;
    let productPrice = document.getElementById("price" + productNumber).value;

    // check is there are enough of this product at store?
    if (+productAtStore < +productAmount) {
      document.getElementById("amountOF" + productNumber).value = '';
      alert("Not enough of " + productName + " at the store!" + "  store: " + productAtStore + "  amount: " + productAmount);
      document.getElementById("amountOF" + productNumber).focus();
    } else {
      let productTotal = Math.round(productPrice * productAmount * 100) / 100;
      document.getElementById("total" + productNumber).value = productTotal;

      // recalculating order sum  
      let orderSum = 0;
      for ( let i = 1; i <= productNumber ; i++ ) {
        orderSum = orderSum + +document.getElementById("total" + i).value;
      };
      document.getElementById("orderTotal").value = orderSum;
    }          


  }



}
