export function getProductByID (id, callback, productNumber) {

  fetch('/product_find_by_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: id}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FPBID was recorded');
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

export function fillProductName(jsonData, productNumber) {

  if (jsonData[0] === undefined) {
    alert('There is no product with this ID in the base!');
    } else {
      document.getElementById("ProductName" + productNumber).value = jsonData[0].product;
      document.getElementById("price" + productNumber).value = jsonData[0].price;
      document.getElementById("atStore" + productNumber).value = jsonData[0].amount;
      document.getElementById("amountOF" + productNumber).focus();
    }

}
