import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

export function getCustomersByName () {  

  const customersName = document.getElementById("textFCBN").value;

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
          createTableFromJSON(jsonData, showDataCustomers);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });


}