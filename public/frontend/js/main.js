console.log('Client-side code running');

//------------- SHOW DATA ELEMENTS -------------
let showDataCustomers = document.getElementById('showDataCustomers');
let showDataProducts = document.getElementById('showDataProducts');


//------------- SHOW DATA ELEMENTS (end) -------------


//------------- NAVIGATION -------------
let customersContainer = document.getElementById('customersContainer');
let goodsContainer = document.getElementById('goodsContainer');
let ordersContainer = document.getElementById('ordersContainer');

document.getElementById('customersButton').addEventListener("click", function(e){
  customersContainer.classList.remove('hidden');
  goodsContainer.classList.add('hidden');
  ordersContainer.classList.add('hidden');
})

document.getElementById('goodsButton').addEventListener("click", function(e){
  customersContainer.classList.add('hidden');
  goodsContainer.classList.remove('hidden');
  ordersContainer.classList.add('hidden');
})

document.getElementById('ordersButton').addEventListener("click", function(e){
  customersContainer.classList.add('hidden');
  goodsContainer.classList.add('hidden');
  ordersContainer.classList.remove('hidden');
})


//------------- NAVIGATION (end) -------------




//------------- ADD NEW CUSTOMER -------------
document.getElementById('newCustomer').addEventListener("click", function(e){
  e.preventDefault();

  let customerForm = document.getElementById("newCustomerForm");
  let newCustomer = {
    name: customerForm["name"].value,
    address: customerForm["address"].value
  }

  console.log(newCustomer);
  fetch('/customer_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newCustomer),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('ADD Click was recorded');
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


});

//------------- ADD NEW CUSTOMER (end) -------------



//------------- ADD NEW PRODUCT -------------
document.getElementById('newProduct').addEventListener("click", function(e){
  e.preventDefault();

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


});

//------------- ADD NEW PRODUCT (end) -------------



//------------- FIND CUSTOMERS BY NAME -------------
document.getElementById('buttonFCBN').addEventListener("click", function(e){

  let customersName = document.getElementById("textFCBN").value;

  fetch('/customers_find_by_name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ name: customersName}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FCBN Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          CreateTableFromJSON(jsonData, showDataCustomers);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });


});

//------------- FIND CUSTOMERS BY NAME (end) -------------


//------------- FIND CUSTOMERS BY ADDRESS -------------
document.getElementById('buttonFCBA').addEventListener("click", function(e){

  let customersAddress = document.getElementById("textFCBA").value;

  fetch('/customers_find_by_address', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ address: customersAddress}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FCBA Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          CreateTableFromJSON(jsonData, showDataCustomers);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });


});

//------------- FIND CUSTOMERS BY ADDRESS (end) -------------



//------------- GET FULL LIST OF CUSTOMERS -------------
const button = document.getElementById('customersRequest');
button.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/customers_request', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          CreateTableFromJSON(jsonData, showDataCustomers);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});
//------------- GET FULL LIST OF CUSTOMERS (end) -------------


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



