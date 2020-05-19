
// getting one product by it's full name
export function getProductByName (product, callback, productNumber) {

  // sending products name to server
  fetch('/product_find_by_name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ product: product}),
  })
    .then(function(response) { // in case of response from server calling callback function
      if(response.ok) {
        console.log('FPBN was recorded');
        response.json().then(function(jsonData) {
          callback(jsonData, productNumber);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) { // handle error
      console.log(error);
    });
}

// callback function for getProductByName
export  function fillProductID (jsonData, productNumber) {

  if (jsonData[0] === undefined) {
    alert('There is no product with this name in the base!');
    nodeProductName.value = '';
    } else { // filling html form
      document.getElementById("ProductID" + productNumber).value = jsonData[0].id;
      document.getElementById("price" + productNumber).value = jsonData[0].price;
      document.getElementById("amountOF" + productNumber).focus();
    }

}
