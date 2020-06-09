
// adding new order to DB tables 'orders' and 'orders_products'
export function addNewOrderHTMLSide () {

// check params
  if (+document.getElementById("orderTotal").value <= 0) {
    alert("Order total should to be more than 0!");
    return
  }

  // let produtsAmount = (document.getElementById("additionalProdctsContainer").childElementCount + 1);
  let produtsAmount = (document.getElementById("prodctsContainer").childElementCount - 1);
  let products = [];

  for(let i = 1; i <= produtsAmount; i++) { // new products object for 'orders_products' table
    let new_orders_products = {
      product_id: document.getElementById("ProductID" + i).value,
      product_name: document.getElementById("ProductName" + i).value,
      amount: document.getElementById("amountOF" + i).value,
      price: document.getElementById("price" + i).value,
      sum: document.getElementById("total" + i).value,
      at_store: document.getElementById("atStore" + i).value
    }

// check params
    if (!new_orders_products.product_id) {
      alert('Field Product ID in the row ' + i + ' is empty!');
      return
    }
    if (!new_orders_products.product_name) {
      alert('Field Product name in the row ' + i + ' is empty!');
      return
    }
    if (!new_orders_products.amount) {
      alert('Field amount in the row ' + i + ' is empty!');
      return
    }
    if (!new_orders_products.price) {
      alert('Field price in the row ' + i + ' is empty!');
      return
    }
    if (!new_orders_products.sum) {
      alert('Field Total in the row ' + i + ' is empty!');
      return
    }
    if (!new_orders_products.at_store) {
      alert('Field at store in the row ' + i + ' is empty!');
      return
    }
    products.push(new_orders_products);

  }

  console.log('products');
  console.log(products);

  let newOrderForm = document.getElementById("newOrderForm");
  let newOrder = { // new products object for 'orders' table
    customer_id: newOrderForm["CustomerID"].value,
    customer_name: newOrderForm["CustomerName"].value,
    customer_address: newOrderForm["CustomerAddress"].value,
    total: document.getElementById("orderTotal").value,
    products: products
  }
  console.log(newOrder);

  // sending new order and products to server
  fetch('/order_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newOrder),
  })
    .then(function(response) {
      console.log('newOrder_add')
      if(response.ok) {  // in case of response from server alerting user
        console.log('ADD order Click was recorded');
        response.text().then(function(text) {
          console.log(text);
          if ( text == 'New order added!') { // clean order form
            document.getElementById("newOrderForm").reset();
            document.getElementById("productsForNewOrderForm").reset();
//            document.getElementById("additionalProdctsContainer").innerHTML = '';
          }
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
