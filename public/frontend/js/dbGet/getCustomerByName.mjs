// get one customer from DB by name

export function getCustomerByName (nameFromOrderForm) {

  // sending customers name to server
  fetch('/customer_find_by_name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ name: nameFromOrderForm}),
  })
    .then(function(response) { // in case of response from server calling functions
      if(response.ok) {
        response.json().then(function(jsonData) {
          if (jsonData[0] === undefined) {
            noCustomerWithThisName(); // in case if no customer was find
          } else {
            customerGottenByName(jsonData); // in case if one customer was find
          }
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) { // handle error
      console.log(error);
    });
}

// callback function for getCustomerByName
function noCustomerWithThisName () {

  let nodeCustomerName = document.getElementById("CustomerName");
  if (nodeCustomerName.value != '') {
    alert('There is no customer with this name in the base!');
    nodeCustomerName.value = '';
    nodeCustomerName.focus();
  }
}

// callback function for getCustomerByName
// filling form on page
function customerGottenByName (jsonData) {
  document.getElementById("CustomerID").value = jsonData[0].id;
  document.getElementById("CustomerAddress").value = jsonData[0].address;
  document.getElementById("ProductID1").focus();
}
