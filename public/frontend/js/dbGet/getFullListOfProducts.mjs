import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

export function getFullListOfProducts () {

  fetch('/products_request', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded (productsRequest)');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          createTableFromJSON(jsonData, showDataProducts);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
