
// deleting last line from product in order form
export function deleteProductFromOrder () {
  let productsInOrder = (document.getElementById("allProdctsContainer").childElementCount + 1);
  if (productsInOrder > 1) {
    let nodeName = "prodctContainer" + productsInOrder;
    document.getElementById(nodeName).remove();
  }
}
