let nodeOrderTable = document.getElementById("showDataOrders");
nodeOrderTable.addEventListener("click", function(e) {
  e.preventDefault();
  console.log(e.target.parentNode);
  let clickRow = e.target.parentNode;
  let click_order_number = clickRow.children[0].innerHTML;
  let click_customer_id = clickRow.children[1].innerHTML;
  let click_customer_name = clickRow.children[2].innerHTML;
  let click_customer_address = clickRow.children[3].innerHTML;
  let click_total = clickRow.children[4].innerHTML;

  if ( isNaN(+click_order_number) ) return;

  let nodeOrderBottomLayer = document.createElement("div");
  nodeOrderBottomLayer.id = "orderBottomLayer";
  document.body.appendChild(nodeOrderBottomLayer);

  let nodeShowOrder = document.createElement("div");
  nodeShowOrder.id = "showOrder";
  nodeOrderBottomLayer.appendChild(nodeShowOrder);

  let nodeOrderName = document.createElement("div");
  nodeShowOrder.innerHTML = "Order Number " + click_order_number;
  nodeShowOrder.appendChild(nodeOrderName);

  let nodeCustomerData = document.createElement("div");
  nodeCustomerData.innerHTML = 
  "Customer ID: " + click_customer_id + "<br />" + 
  "Customer name: " + click_customer_name + "<br />" + 
  "Customer address: " + click_customer_address;
  nodeShowOrder.appendChild(nodeCustomerData);

  let nodeOrderProducts = document.createElement("div");
  nodeOrderProducts.id = "OrderProducts";
  nodeShowOrder.appendChild(nodeOrderProducts);

  let nodeTotal = document.createElement("div");
  nodeTotal.innerHTML = "Total: " + click_total + "$";
  nodeShowOrder.appendChild(nodeTotal);

  let nodeCloseOrder = document.createElement("button");
  nodeCloseOrder.id = "closeOrder";
  nodeCloseOrder.innerHTML = "close order";
  nodeShowOrder.appendChild(nodeCloseOrder);
  
  addEvent("closeOrder")

  function addEvent (id) {
    document.getElementById(id).addEventListener("click", function() {
      nodeOrderBottomLayer.parentNode.removeChild(nodeOrderBottomLayer);
    });
  
  }


  findOrderProductsHTMLSide();


  function findOrderProductsHTMLSide () {
  
    fetch('/order_product_find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ order_id: click_order_number}),
    })
      .then(function(response) {
        if(response.ok) {
          console.log('Find product Click was recorded');
          response.json().then(function(jsonData) {
            console.log(jsonData);
            CreateTableFromJSON(jsonData, OrderProducts, 2);
          });
        } else {
          throw new Error('Request failed.');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  
  
  };
  
  
});
