import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

export function getCustomersByAddress () {

  const customersAddress = document.getElementById("textFCBA").value;

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
          createTableFromJSON(jsonData, showDataCustomers);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });


};
