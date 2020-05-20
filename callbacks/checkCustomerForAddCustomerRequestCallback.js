const { addCustomer } = require("../dbRequests/add/addCustomer");

// callback for add customer after checkCustomerInBase
function checkCustomerForAddCustomerRequestCallback(res, name, address, result) {
  let resultBoolean = (result.length > 0); // check if customer is already exist in db
  if (resultBoolean) {
    console.log('customer is already in base!');
    res.send('Customer is already in base!');
  }
  else { // adding customer
    addCustomer(name, address);
    res.send('New customer added!');
  }
}
exports.checkCustomerForAddCustomerRequestCallback = checkCustomerForAddCustomerRequestCallback;
