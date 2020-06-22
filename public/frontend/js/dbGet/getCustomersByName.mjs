import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

// getting many customers by part of customers name
export function getCustomersByName () {  

  const customersName = document.getElementById("textFCBN").value;

  // sending part of customers name to server
  fetch('/customers_find_by_name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ name: customersName}),
  })
    .then(function(response) { // in case of response from server inserting a table to html
      if(response.ok) {
        response.json().then(function(jsonData) {
          createTableFromJSON(jsonData, showDataCustomers);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) { // handle error
      console.log(error);
    });


}