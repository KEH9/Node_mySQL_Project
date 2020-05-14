import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

export function getOrdersById () {

  let orderId = document.getElementById("textFOBOID").value;

  fetch('/orders_find_by_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: orderId}),
  })
    .then(function(response) {
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
    .catch(function(error) {
      console.log(error);
    });


};
