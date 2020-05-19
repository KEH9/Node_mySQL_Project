
// adding new customer to DB
export function addNewCustomerHTMLSide () {

  const customerForm = document.getElementById("newCustomerForm");

// new customer object
  let newCustomer = {
    name: customerForm["name"].value,
    address: customerForm["address"].value
  }
  console.log(newCustomer);

  // sending new customer to server
  fetch('/customer_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newCustomer),
  })
    .then(function(response) { 
      console.log('customer_add response')
      if(response.ok) { // in case of response from server alerting user
        console.log('ADD Click was recorded');
        response.text().then(function(text) {
          console.log(text);
          alert(text);
        });
      } else {
        
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) { // handle error
      console.log(error);
    });

};
