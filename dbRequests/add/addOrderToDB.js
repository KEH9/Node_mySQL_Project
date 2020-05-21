const { addOrder } = require("./addOrder");
const { checkCustomerInBase } = require("../check/checkCustomerInBase");


function addOrderToDB(res, customer_id, customer_name, customer_address, total, productsArray) {
  checkCustomerInBase(res, addOrder, customer_name, customer_address, customer_id, total, productsArray);
}
exports.addOrderToDB = addOrderToDB;
