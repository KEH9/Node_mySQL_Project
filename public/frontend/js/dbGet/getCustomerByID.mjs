// get one customer from DB by ID
export function getCustomerByID (id, callback) {

  // sending customers ID to server
  fetch('/customer_find_by_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: id}),
  })
    .then(function(response) { // in case of response from server calling callback and sending response
      if(response.ok) {
        console.log('FCBID was recorded');
        response.json().then(function(jsonData) { 
          callback(jsonData); 
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {// handle error
      console.log(error);
    });
}

// callback function for getCustomerByID
export  function fillCustomerName(jsonData) {

  if (jsonData[0] === undefined) {
    alert('There is no customer with this ID in the base!');
    nodeCustomerID.value = '';
    } else { // filling form
      document.getElementById("CustomerName").value = jsonData[0].name;
      document.getElementById("CustomerAddress").value = jsonData[0].address;
      document.getElementById("ProductID1").focus();
    }

}
