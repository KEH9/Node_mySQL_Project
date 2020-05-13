export function getCustomerByName (nameFromOrderForm) {

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
  document.getElementById("ProductID1").focus();
}
