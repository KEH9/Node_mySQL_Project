export function addNewCustomerHTMLSide () {

  const customerForm = document.getElementById("newCustomerForm");
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
      console.log('!!!!!!!!!!!!customer_add!!!!!!!!!!!!')
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


};
