const { addCustomer } = require("../dbRequests/add/addCustomer");

function checkCustomerForAddCustomerRequestCallback(res, name, address, result) {
  let resultBoolean = (result.length > 0);
  if (resultBoolean) {
    console.log('customer is already in base!');
    res.send('Customer is already in base!');
  }
  else {
    addCustomer(name, address);
    res.send('New customer added!');
  }
}
exports.checkCustomerForAddCustomerRequestCallback = checkCustomerForAddCustomerRequestCallback;
