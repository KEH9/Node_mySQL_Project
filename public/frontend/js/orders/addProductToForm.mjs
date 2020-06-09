import {
  catchEnterOnProductID,
  catchEnterOnProductName,
  catchEnterOnAmount
} from '../sharedFunctions/catchEnterOn.mjs'

// adding new line for product to order form
export function addProductToForm () {
  let productsInOrder = (document.getElementById("prodctsContainer").childElementCount);

  let allProdctsContainer = document.getElementById('prodctsContainer');

  let prodctContainer = document.createElement("tr");
  prodctContainer.id = "prodctContainer" + productsInOrder;


  // product ID
  var nodeInputPID = document.createElement("input"); // PID - Product ID   
  nodeInputPID.type = "number";
  nodeInputPID.name = "ProductID" + productsInOrder;
  nodeInputPID.id =  "ProductID" + productsInOrder;
  let cellPID = document.createElement("td");
  cellPID.appendChild(nodeInputPID);
  prodctContainer.appendChild(cellPID);


  // product name
  var nodeInputPN = document.createElement("input");   
  nodeInputPN.type = "text";
  nodeInputPN.name = "ProductName" + productsInOrder;
  nodeInputPN.id =  "ProductName" + productsInOrder;
  let cellPN = document.createElement("td");
  cellPN.appendChild(nodeInputPN);
  prodctContainer.appendChild(cellPN);
  

  // price
  var nodeInputPrice = document.createElement("input");   
  nodeInputPrice.type = "number";
  nodeInputPrice.name = "price" + productsInOrder;
  nodeInputPrice.id =  "price" + productsInOrder;
  prodctContainer.appendChild(nodeInputPrice);
  let cellPrice = document.createElement("td");
  cellPrice.appendChild(nodeInputPrice);
  prodctContainer.appendChild(cellPrice);
  

  // amount
  var nodeInputAmount = document.createElement("input");   
  nodeInputAmount.type = "number";
  nodeInputAmount.name = "amountOF" + productsInOrder;
  nodeInputAmount.id =  "amountOF" + productsInOrder;
  prodctContainer.appendChild(nodeInputAmount);
  let cellAmount = document.createElement("td");
  cellAmount.appendChild(nodeInputAmount);
  prodctContainer.appendChild(cellAmount);

  
  // at store
  var nodeInputAtStore = document.createElement("input");   
  nodeInputAtStore.type = "number";
  nodeInputAtStore.name = "atStore" + productsInOrder;
  nodeInputAtStore.id =  "atStore" + productsInOrder;
  prodctContainer.appendChild(nodeInputAtStore);
  let cellAtStore = document.createElement("td");
  cellAtStore.appendChild(nodeInputAtStore);
  prodctContainer.appendChild(cellAtStore);

  
  // total
  var nodeInputTotal = document.createElement("input");   
  nodeInputTotal.type = "number";
  nodeInputTotal.name = "total" + productsInOrder;
  nodeInputTotal.id =  "total" + productsInOrder;
  prodctContainer.appendChild(nodeInputTotal);
  let cellTotal = document.createElement("td");
  cellTotal.appendChild(nodeInputTotal);
  prodctContainer.appendChild(cellTotal);
  

  allProdctsContainer.appendChild(prodctContainer);
  catchEnterOnProductID(productsInOrder);
  catchEnterOnProductName(productsInOrder);
  catchEnterOnAmount(productsInOrder);

}

