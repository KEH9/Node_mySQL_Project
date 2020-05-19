
// adding new product to DB
export function addNewProductHTMLSide () {

  const productForm = document.getElementById("newProductForm");
  let newProduct = { // new product object
    product: productForm["product"].value,
    price: productForm["price"].value,
    amount: productForm["amount"].value
  }
  console.log(newProduct);

  // sending new product to server
  fetch('/product_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newProduct),
  })
    .then(function(response) { // in case of response from server alerting user
      if(response.ok) {
        console.log('ADD PRODUCT Click was recorded');
        response.text().then(function(text) {
          console.log(text);
          alert(text);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) { // handle error
      console.log(error);
    });
};
