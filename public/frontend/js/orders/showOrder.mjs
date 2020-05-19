import {createTableFromJSON} from '../sharedFunctions/createTableFromJSON.mjs'

// shows order detailed information
export function showOrder (e) {

  // collecting information about order
  let clickRow = e.target.parentNode;
  let click_order_number = clickRow.children[0].innerHTML;
  let click_customer_id = clickRow.children[1].innerHTML;
  let click_customer_name = clickRow.children[2].innerHTML;
  let click_customer_address = clickRow.children[3].innerHTML;
  let click_total = clickRow.children[4].innerHTML;

  if ( isNaN(+click_order_number) ) return; // check 'is click in order row?'

  // adding and filling elements of 'show order' form
  // background
  let nodeOrderBottomLayer = document.createElement("div");
  nodeOrderBottomLayer.id = "orderBottomLayer";
  document.body.appendChild(nodeOrderBottomLayer);

  // order field
  let nodeShowOrder = document.createElement("div");
  nodeShowOrder.id = "showOrder";
  nodeOrderBottomLayer.appendChild(nodeShowOrder);

  // order name
  let nodeOrderName = document.createElement("div");
  nodeShowOrder.innerHTML = "Order Number " + click_order_number;
  nodeShowOrder.appendChild(nodeOrderName);

  // customer information
  let nodeCustomerData = document.createElement("div");
  nodeCustomerData.innerHTML = 
  "Customer ID: " + click_customer_id + "<br />" + 
  "Customer name: " + click_customer_name + "<br />" + 
  "Customer address: " + click_customer_address;
  nodeShowOrder.appendChild(nodeCustomerData);

  // products
  let nodeOrderProducts = document.createElement("div");
  nodeOrderProducts.id = "OrderProducts";
  nodeShowOrder.appendChild(nodeOrderProducts);

  // total
  let nodeTotal = document.createElement("div");
  nodeTotal.innerHTML = "Total: " + click_total + "$";
  nodeShowOrder.appendChild(nodeTotal);

  // close order button
  let nodeCloseOrder = document.createElement("button");
  nodeCloseOrder.id = "closeOrder";
  nodeCloseOrder.innerHTML = "close order";
  nodeShowOrder.appendChild(nodeCloseOrder);
  
  addEvent("closeOrder", nodeOrderBottomLayer) // add evernt 'close order'

  // filling products table for this order
  findOrderProductsHTMLSide(click_order_number);
}


// add evernt 'close order'
function addEvent (id, nodeOrderBottomLayer) {
  document.getElementById(id).addEventListener("click", function() {
    nodeOrderBottomLayer.parentNode.removeChild(nodeOrderBottomLayer);
  });

}

  // filling products table for this order
function findOrderProductsHTMLSide (click_order_number) {
  
  // sending  order id to server
  fetch('/order_product_find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ order_id: click_order_number}),
  })
    .then(function(response) { // in case of response from server inserting a table to html
      if(response.ok) {
        console.log('Find product Click was recorded');
        response.json().then(function(jsonData) {
          console.log(jsonData);
          createTableFromJSON(jsonData, OrderProducts, 2);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) { // handle error
      console.log(error);
    });


};



