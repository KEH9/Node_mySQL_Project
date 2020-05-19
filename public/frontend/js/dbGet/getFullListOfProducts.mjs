import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

// getting all products from DB
export function getFullListOfProducts () {

  // sending request to server
  fetch('/products_request', {method: 'POST'})
    .then(function(response) {
      if(response.ok) { // in case of response from server inserting a table to html
        console.log('Click was recorded (productsRequest)');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          createTableFromJSON(jsonData, showDataProducts);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) { // handle error
      console.log(error);
    });
}
