import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

// getting all orders by customers name
export function getOrdersByCustomerName () {

  let customerName = document.getElementById("textFOBCN").value;

  // sending customers name to server
  fetch('/orders_find_by_customer_name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ name: customerName}),
  })
    .then(function(response) { // in case of response from server inserting a table to html
      if(response.ok) {
        console.log('FOBCN Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
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

