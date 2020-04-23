//------------- SHOW DATA ELEMENTS -------------
let showDataOrders = document.getElementById('showDataOrders');
//------------- SHOW DATA ELEMENTS (end) -------------


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




