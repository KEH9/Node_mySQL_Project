//--------------------------------- CUSTOMERS ---------------------------------

// customers add new customer, field = name
let nodeName = document.getElementById("name");
nodeName.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      document.getElementById("address").focus();
    }
});

// customers add new customer, field = address
let nodeAddress = document.getElementById("address");
nodeAddress.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      addNewCustomerHTMLSide();
    }
});


// customers find customer by name
let nodeFCBN = document.getElementById("textFCBN");
nodeFCBN.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      findCustomerByNameHTMLSide();
    }
});

// customers find customer by address
let nodeFCBA = document.getElementById("textFCBA");
nodeFCBA.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      findCustomerByAddressHTMLSide();
    }
});




//--------------------------------- GOODS ---------------------------------

// goods add new product, field = product
let nodeProduct = document.getElementById("product");
nodeProduct.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      document.getElementById("price").focus();
    }
});

// goods add new product, field = price
let nodePrice = document.getElementById("price");
nodePrice.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      document.getElementById("amount").focus();
    }
});

// goods add new product, field = amount
let nodeAmount = document.getElementById("amount");
nodeAmount.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      addNewProductHTMLSide();
    }
});


// goods find product
let nodeTextFP = document.getElementById("textFP");
nodeTextFP.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      findProductHTMLSide(e);
    }
});



//--------------------------------- ORDERS ---------------------------------

// orders, onEnter field = customer ID
let nodeCustomerID = document.getElementById("CustomerID");
nodeCustomerID.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      let customerID = nodeCustomerID.value;
      getCustomerByID(customerID, fillCustomerName);
    }

});


// orders, onEnter field = customer name
let nodeCustomerName = document.getElementById("CustomerName");
nodeCustomerName.addEventListener("keydown", function(e) {
    if (event.key === "Enter") {
      e.preventDefault();
      let customerNameInOrders = nodeCustomerName.value;
      getCustomerByName(customerNameInOrders);
    }
});


// orders, onEnter field = product ID
catchEnterOnProductID(1);
function catchEnterOnProductID (productNumber) {
  let nodeProductID = document.getElementById("ProductID" + productNumber);
  nodeProductID.addEventListener("keydown", function(e) {
      if (event.key === "Enter") {
        e.preventDefault();
        let productIDInOrders = nodeProductID.value;
        getProductByID(productIDInOrders, fillProductName, productNumber);
      }
  });
}

// orders, onEnter field = product name
catchEnterOnProductName(1);
function catchEnterOnProductName (productNumber) {
  let nodeProductName = document.getElementById("ProductName" + productNumber);
  nodeProductName.addEventListener("keydown", function(e) {
      if (event.key === "Enter") {
        e.preventDefault();
        let productNameInOrders = nodeProductName.value;
        getProductByName(productNameInOrders, fillProductID, productNumber);
      }
  });
};

// orders, onEnter field = amount
catchEnterOnAmount(1);
function catchEnterOnAmount (productNumber) {
  let nodeAmountOF = document.getElementById("amountOF" + productNumber);
  nodeAmountOF.addEventListener("keydown", function(e) {
      if (event.key === "Enter") {
        e.preventDefault();

        let productAmount = document.getElementById("amountOF" + productNumber).value;
        let productPrice = document.getElementById("price" + productNumber).value;
        let productTotal = Math.round(productPrice * productAmount * 100) / 100;
        document.getElementById("total" + productNumber).value = productTotal;

        let orderSum = 0;
        for ( let i = 1; i <= productNumber ; i++ ) {
          orderSum = orderSum + +document.getElementById("total" + i).value;
        };
        document.getElementById("orderTotal").value = orderSum;
      }
  });
}


