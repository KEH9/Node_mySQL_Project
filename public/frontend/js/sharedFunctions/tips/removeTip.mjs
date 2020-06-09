export function removeTip(tipGeneratorID) {
  let tipDivID = tipGeneratorID + "-tip";
  document.getElementById(tipDivID).remove();
}
