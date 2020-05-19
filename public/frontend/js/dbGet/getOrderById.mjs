import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

// getting one order by it's ID
export function getOrderById () {

  let orderId = document.getElementById("textFOBOID").value;

  // sending orders ID to server
  fetch('/orders_find_by_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: orderId}),
  })
    .then(function(response) { // in case of response from server inserting a table to html
      if(response.ok) {
        console.log('FOBID Click was recorded');
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
