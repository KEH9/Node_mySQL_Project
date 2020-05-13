
export function getCustomerByID (id, callback) {

  fetch('/customer_find_by_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ id: id}),
  })
    .then(function(response) {
      if(response.ok) {
        console.log('FCBID was recorded');
        response.json().then(function(jsonData) {
          callback(jsonData);
        });
      } else {
        throw new Error('Request failed.');
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

export  function fillCustomerName(jsonData) {

  if (jsonData[0] === undefined) {
    alert('There is no customer with this ID in the base!');
    nodeCustomerID.value = '';
    } else {
      document.getElementById("CustomerName").value = jsonData[0].name;
      document.getElementById("CustomerAddress").value = jsonData[0].address;
      document.getElementById("ProductID1").focus();
    }

}
