import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

// getting all orders from DB
export function getFulListOfOrders (e) {

  // sending request to server
  fetch('/orders_request', {method: 'POST'})
    .then(function(response) {
      if(response.ok) { // in case of response from server inserting a table to html
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
