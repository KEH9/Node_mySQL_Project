import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

export function getOrdersByCustomerName () {

  let customerName = document.getElementById("textFOBCN").value;

  fetch('/orders_find_by_customer_name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ name: customerName}),
  })
    .then(function(response) {
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
    .catch(function(error) {
      console.log(error);
    });
};

