
// getting one product by it's ID
export function getProductByID (id, callback, productNumber) {

  // sending products ID to server
  fetch('/product_find_by_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: id}),
  })
    .then(function(response) { // in case of response from server calling callback function
      if(response.ok) {
        console.log('FPBID was recorded');
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

// callback function for getProductByID
export function fillProductName(jsonData, productNumber) {

  if (jsonData[0] === undefined) {
    let element = document.getElementById("ProductID" + productNumber);
    element.value = '';
    element.classList.add('no-blur-event');
    alert('There is no product with this ID in the base!');
    element.focus();
    setTimeout(function(){
      element.classList.remove('no-blur-event');
    }, 100);
    } else { // filling html form
      document.getElementById("ProductName" + productNumber).value = jsonData[0].product;
      document.getElementById("price" + productNumber).value = jsonData[0].price;
      document.getElementById("atStore" + productNumber).value = jsonData[0].amount;
      document.getElementById("amountOF" + productNumber).focus();
    }

}
