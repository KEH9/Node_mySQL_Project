import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

// getting products by part of it's name
export function getProductsByName () {

  const productName = document.getElementById("textFP").value;

  // sending part of products name to server
  fetch('/product_find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ product: productName}),
  })
    .then(function(response) {
      if(response.ok) { // in case of response from server inserting a table to html
        console.log('Find product Click was recorded');
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
};
