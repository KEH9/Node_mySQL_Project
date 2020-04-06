console.log('Client-side code running');


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
          CreateTableFromJSON(jsonData);
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
          CreateTableFromJSON(jsonData);
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
          CreateTableFromJSON(jsonData);
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



