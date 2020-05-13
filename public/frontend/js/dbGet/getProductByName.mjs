export function getProductByName (product, callback, productNumber) {

  fetch('/product_find_by_name', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ product: product}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FPBN was recorded');
        response.json().then(function(jsonData) {
          callback(jsonData, productNumber);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

export  function fillProductID (jsonData, productNumber) {

  if (jsonData[0] === undefined) {
    alert('There is no product with this name in the base!');
    nodeProductName.value = '';
    } else {
      document.getElementById("ProductID" + productNumber).value = jsonData[0].id;
      document.getElementById("price" + productNumber).value = jsonData[0].price;
      document.getElementById("amountOF" + productNumber).focus();
    }

}

//------------- GET PRODUCT BY ID (end) -------------
