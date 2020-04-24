//------------- INI -------------
let showDataOrders = document.getElementById('showDataOrders');
let productsInOrder = 1;

//------------- INI (end) -------------


//------------- GET CUSTOMER BY ID -------------
function getCustomerByID (id, callback) {

  fetch('/customer_find_by_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: id}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FCBID was recorded');
        response.json().then(function(jsonData) {
          callback(jsonData);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

function fillCustomerName(jsonData) {

  if (jsonData[0] === undefined) {
    alert('There is no customer with this ID in the base!');
    nodeCustomerID.value = '';
    } else {
      document.getElementById("CustomerName").value = jsonData[0].name;
      document.getElementById("CustomerAddress").value = jsonData[0].address;
      document.getElementById("ProductID").focus();
    }

}

//------------- GET CUSTOMER BY ID (end) -------------



//------------- GET CUSTOMER BY NAME -------------
function getCustomerByName (nameFromOrderForm) {

  fetch('/customer_find_by_name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ name: nameFromOrderForm}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FCBN in oders form was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          if (jsonData[0] === undefined) {
            noCustomerWithThisName();
          } else {
            customerGottenByName(jsonData);
          }
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}


function noCustomerWithThisName () {
  alert('There is no customer with this name in the base!');
  nodeCustomerName.value = '';
}

function customerGottenByName (jsonData) {
  document.getElementById("CustomerID").value = jsonData[0].id;
  document.getElementById("CustomerAddress").value = jsonData[0].address;
  document.getElementById("ProductID").focus();
}
//------------- GET CUSTOMER BY NAME (end) -------------



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
  let nodeToAddProduct = document.getElementById('productsForNewOrderForm');
  
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
  

  // amount
  var nodeTextAmount = document.createTextNode(" Amount: ");
  prodctContainer.appendChild(nodeTextAmount);

  var nodeInputAmount = document.createElement("input");   
  nodeInputPN.type = "number";
  nodeInputPN.name = "Amount" + productsInOrder;
  nodeInputPN.id =  "Amount" + productsInOrder;
  prodctContainer.appendChild(nodeInputAmount);
  

  allProdctsContainer.appendChild(prodctContainer);
}


function deleteProductFromOrder () {
  if (productsInOrder > 1) {
    let nodeName = "prodctContainer" + productsInOrder;
    document.getElementById(nodeName).remove();
    productsInOrder -= 1;
  }
}


//------------- MULTIPLY PRODUCTS IN THE ORDER (end) -------------



