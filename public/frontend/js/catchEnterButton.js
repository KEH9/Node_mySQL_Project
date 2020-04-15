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

