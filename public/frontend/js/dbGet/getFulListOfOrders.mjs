import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

export function getFulListOfOrders (e) {

  console.log('button was clicked');

  fetch('/orders_request', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
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
