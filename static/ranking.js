'use strict';
let fields = ["He_kika","He_vakiy"];
let headers = [selitteet.He_kika,selitteet.He_vakiy];

createRankTable();
createFieldSelector();
createTableHeaders("Alue", "Postinumero", selitteet.He_kika,selitteet.He_vakiy);

//TODO: korjaa sorting numeroilla
function sortRanking(n) {
    //koodi: https://www.w3schools.com/howto/howto_js_sort_table.asp
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("rankingTable");
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
  //console.log(selitteet);
  for (let alue of data) {
    let values = [];
    for (let i = 0; i < fields.length; i++) {
      values.push(alue[fields[i]]);
    }
    let row = createTableRow(alue.nimi, alue.id, values);
    table.appendChild(row);
  }
}


//tekee parametreina annetuista arvoista ranking -taulukkoon header rivin.
function createTableHeaders(){
  let nimi = createHeader(0, "Alue");
  let id = createHeader(1, "Postinumero");
  document.getElementById("headers").appendChild(nimi);
  document.getElementById("headers").appendChild(id);

  for (let i = 0; i < headers.length; i++) {
    let header = createHeader(i+2,headers[i]); //i vastaa saraketta
      document.getElementById("headers").appendChild(header);
  }
}


//tekee parametrina annetusta tekstistä yksittäisen headerin ja asettaa sille vastaavan rivin sorting.
function createHeader(column, text) {
  let th = document.createElement("th");
  th.onclick = function (){
      sortRanking(column);
  };
  th.appendChild(document.createTextNode(text));
  return th;
}
function createTableRow(name, id, text) {
  let row = document.createElement("tr");
  row.appendChild(createLinkField(name, id));
  row.appendChild(createLinkField(id, id));
  for (let i = 0; i < text.length; i++) {
    row.appendChild(createTableField(text[i]));
  }
function createTableField(text) {
    let td = document.createElement("td");
    let nimi = document.createTextNode(text);
    td.appendChild(nimi);
    return td;
}

  return row;
}

function createLinkField(region, id) {
  let td = document.createElement("td");
    let nimi = document.createElement("a");
    nimi.textContent = region;
    nimi.href = "/alue?pnro=" + id;
    td.appendChild(nimi);
    return td;

}


function createFieldSelector() {
  let container = document.getElementById("fieldSelector");
  for (let selite in selitteet) {
    let option = document.createElement("option");
    option.value = selite;
    option.appendChild(document.createTextNode(selitteet[selite]));
    container.appendChild(option);
  }
  container.onchange = function() {
    clearTable(false);
    changeField(container.value);
  };

}


function changeField(selection) {
  clearTable(true); //säilytetään headerit
  fields.push(selection);
  createRankTable();
  headers.push(selitteet[selection]);
  createTableHeaders();
  console.log(selitteet[selection]);

}

function addField() {
  let selector = document.getElementById("fieldSelector");
  console.log(selector.value);
  changeField(selector.value);
}

//Clearheaders määrittelee tyhjennetäänkö headerit
function clearTable(keepHeaders) {
  if (!keepHeaders) {
    fields = [];
    headers = [];
  }

  let table = document.getElementById("rankingTable");
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
  let headerRow = document.createElement("tr");
  headerRow.id = "headers";
  table.appendChild(headerRow);
}