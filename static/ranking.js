'use strict';
createRankTable();
function sortRanking(n) {
    //koodi: https://www.w3schools.com/howto/howto_js_sort_table.asp
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("ranking");
    switching = true;
      dir = "asc";
      while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount ++;
        } else {
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
}

function createRankTable() {
  let table = document.getElementById("rankingTable");
  for (let alue of data) {
    let row = createTableRow(alue.nimi, alue.id, alue.He_kika);
    table.appendChild(row);
  }
  console.log(data);
}

function createTableRow(text) {
  let row = document.createElement("tr");

  for (let i = 0; i < arguments.length; i++) {
    let td = document.createElement("td");
    let nimi = document.createTextNode(arguments[i]);
    td.appendChild(nimi);
    row.appendChild(td);
  }

  return row;
}