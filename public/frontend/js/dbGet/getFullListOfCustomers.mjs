import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

// getting all customers from DB
export function getFullListOfCustomers () {

  // sending request to server
  fetch('/customers_request', {method: 'POST'})
    .then(function(response) {
      if(response.ok) { // in case of response from server inserting a table to html
        console.log('Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          createTableFromJSON(jsonData, showDataCustomers);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) { // handle error
      console.log(error);
    });    
}

