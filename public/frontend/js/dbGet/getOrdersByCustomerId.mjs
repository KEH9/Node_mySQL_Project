import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';


export function getOrdersByCustomerId () {

  let customerId = document.getElementById("textFOBCID").value;

  fetch('/orders_find_by_customer_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: customerId}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FOBCID Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          createTableFromJSON(jsonData, showDataOrders);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

