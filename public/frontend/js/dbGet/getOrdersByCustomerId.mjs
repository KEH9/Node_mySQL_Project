import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

// getting all orders by customers ID
export function getOrdersByCustomerId () {

  let customerId = document.getElementById("textFOBCID").value;

  // sending customers ID to server
  fetch('/orders_find_by_customer_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: customerId}),
  })
    .then(function(response) { // in case of response from server inserting a table to html
      if(response.ok) {
        response.json().then(function(jsonData) {
          createTableFromJSON(jsonData, showDataOrders);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) { // handle error
      console.log(error);
    });
};

