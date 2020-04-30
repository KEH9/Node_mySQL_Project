//------------- SHOW DATA ELEMENTS -------------
let showDataProducts = document.getElementById('showDataProducts');
//------------- SHOW DATA ELEMENTS (end) -------------


//------------- ADD NEW PRODUCT -------------
document.getElementById('newProduct').addEventListener("click", function(e){
  e.preventDefault();
  addNewProductHTMLSide();

});

function addNewProductHTMLSide () {

  let productForm = document.getElementById("newProductForm");
  let newProduct = {
    product: productForm["product"].value,
    price: productForm["price"].value,
    amount: productForm["amount"].value
  }

  console.log(newProduct);
  fetch('/product_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newProduct),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('ADD PRODUCT Click was recorded');
        response.text().then(function(text) {
          console.log(text);
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

//------------- ADD NEW PRODUCT (end) -------------


//------------- FIND PRODUCTS -------------
document.getElementById('buttonFP').addEventListener("click", function (e) {
  findProductsHTMLSide(e);
} );

function findProductsHTMLSide () {

  let productName = document.getElementById("textFP").value;

  fetch('/product_find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ product: productName}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('Find product Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          CreateTableFromJSON(jsonData, showDataProducts);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });


};

//------------- FIND PRODUCTS (end) -------------


//------------- GET FULL LIST OF PRODUCTS -------------
const buttonPR = document.getElementById('productsRequest');
buttonPR.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/products_request', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded (productsRequest)');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          CreateTableFromJSON(jsonData, showDataProducts);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});
//------------- GET FULL LIST OF PRODUCTS (end) -------------



