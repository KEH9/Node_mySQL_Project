import {
  catchEnterOnProductID,
  catchEnterOnProductName,
  catchEnterOnAmount
} from '../sharedFunctions/catchEnterOn.mjs'

// adding new line for product to order form
export function addProductToForm () {
  let productsInOrder = (document.getElementById("allProdctsContainer").childElementCount + 2);

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

