import {getProductByID, fillProductName} from '../dbGet/getProductByID.mjs';
import {getProductByName, fillProductID} from '../dbGet/getProductByName.mjs';


export function catchEnterOnProductID (productNumber) {
  let nodeProductID = document.getElementById("ProductID" + productNumber);
  nodeProductID.addEventListener("keydown", function(e) {
      if (event.key === "Enter") {
        e.preventDefault();

        let productIDInOrders = nodeProductID.value;

        let i = 1;
        let node = document.getElementById("ProductID" + i)
        let exist = false;

        while (!!node) {
          if (node.value == productIDInOrders && i !== productNumber) {
            alert('this product is already exist in this order!')
            exist = true;
            nodeProductID.value = '';
          }
          i++;
          node = document.getElementById("ProductID" + i)
        }

        if (!exist) {
          getProductByID(productIDInOrders, fillProductName, productNumber);
        }
      }
  });
}


export function catchEnterOnProductName (productNumber) {
  let nodeProductName = document.getElementById("ProductName" + productNumber);
  nodeProductName.addEventListener("keydown", function(e) {
      if (event.key === "Enter") {
        e.preventDefault();
        let productNameInOrders = nodeProductName.value;
        getProductByName(productNameInOrders, fillProductID, productNumber);
      }
  });
};


export function catchEnterOnAmount (productNumber) {
  let nodeAmountOF = document.getElementById("amountOF" + productNumber);
  nodeAmountOF.addEventListener("keydown", function(e) {
      if (event.key === "Enter") {
        e.preventDefault();

        let productName = document.getElementById("ProductName" + productNumber).value;
        let productAmount = document.getElementById("amountOF" + productNumber).value;
        let productAtStore = document.getElementById("atStore" + productNumber).value;
        let productPrice = document.getElementById("price" + productNumber).value;

        if (+productAtStore < +productAmount) {
          alert("Not enough of " + productName + " at the store!" + "  store: " + productAtStore + "  amount: " + productAmount);
        } else {
          let productTotal = Math.round(productPrice * productAmount * 100) / 100;
          document.getElementById("total" + productNumber).value = productTotal;
  
          let orderSum = 0;
          for ( let i = 1; i <= productNumber ; i++ ) {
            orderSum = orderSum + +document.getElementById("total" + i).value;
          };
          document.getElementById("orderTotal").value = orderSum;
        }          

      }
  });
}
