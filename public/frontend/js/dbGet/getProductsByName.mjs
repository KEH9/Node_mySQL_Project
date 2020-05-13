import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs';

export function getProductsByName () {

  const productName = document.getElementById("textFP").value;

  fetch('/product_find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ product: productName}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('Find product Click was recorded');
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
};
