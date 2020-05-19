import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

// getting many customers by part of customers address
export function getCustomersByAddress () {

  const customersAddress = document.getElementById("textFCBA").value;

  // sending part of customers address to server
  fetch('/customers_find_by_address', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ address: customersAddress}),
  })
    .then(function(response) { // in case of response from server inserting a table to html
      if(response.ok) {
        console.log('FCBA Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          createTableFromJSON(jsonData, showDataCustomers);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) { // handle error
      console.log(error);
    });
};
