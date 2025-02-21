import {addTipsEventsToNewlyGeneratedElements} from './tips/addTipsEventsToNewlyGeneratedElements.mjs'
// create table from json data and insert it into html element  
export function createTableFromJSON (jsonData, element, firstCol=0) {

  // EXTRACT VALUE FOR HTML HEADER
  var col = [];
  for (var i = 0; i < jsonData.length; i++) {
      for (var key in jsonData[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }
  }

  // CREATE DYNAMIC TABLE
  var table = document.createElement("table");
  table.classList.add("show-data-table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE

  var tr = table.insertRow(-1);                   // TABLE ROW

  for (var i = firstCol; i < col.length; i++) {
      var th = document.createElement("th");      // TABLE HEADER
      th.innerHTML = col[i];
      tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS
  for (var i = 0; i < jsonData.length; i++) {

      tr = table.insertRow(-1);

      for (var j = firstCol; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          tabCell.innerHTML = jsonData[i][col[j]];
          if (element.id == 'showDataOrders') {
            tabCell.classList.add("click-me");
          }
      }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER
  element.innerHTML = "";
  element.appendChild(table);

  addTipsEventsToNewlyGeneratedElements();

}

