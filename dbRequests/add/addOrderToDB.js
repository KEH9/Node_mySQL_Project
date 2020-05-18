const { addOrder } = require("./addOrder");
const { checkCustomerInBase } = require("../check/checkCustomerInBase");


function addOrderToDB(res, customer_id, customer_name, customer_address, total, productsArray) {
  checkCustomerInBase(res, customer_name, customer_address, addOrder, customer_id, total, productsArray);
}
exports.addOrderToDB = addOrderToDB;
