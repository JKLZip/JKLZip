'use strict';
let oletus = "He_vakiy";
let layers = ["He_vakiy", "He_as_tiheys", "He_naiset_pros", "He_miehet_pros", "He_kika", "Hr_ktu", "Hr_pi_tul_pros", "Hr_ke_tul_pros",
              "Hr_hy_tul_pros", "Pt_opisk_pros", "Pt_tyott_pros", "Pt_tyoll_pros", "Pt_elakel_pros", "Pt_0_14_pros", "Ko_perus_pros",
              "Ko_yliop_pros", "Ko_ammat_pros", "Ko_al_kork_pros", "Ko_yl_kork_pros", "Ra_pt_as_pros", "Ra_kt_as_pros", "Ra_as_kpa",
              "Ra_ke", "Te_takk", "Te_omis_as_pros", "Te_vuok_as_pros", "Tp_alku_a_pros", "Tp_jalo_bf_pros", "Tp_palv_gu_pros",
              "yritykset_lkm"];

createTableHeaders(oletus);
createRankTable(oletus);
createFieldSelector();
sortRanking(2, true, false);

function sortRanking(column, number, ascending) {
    //koodi: https://www.w3schools.com/howto/howto_js_sort_table.asp
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("rankingTable");
    switching = true;
      dir = (ascending ? "asc" : "desc");
      while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[column];
          y = rows[i + 1].getElementsByTagName("td")[column];
          if (dir == "asc") {
            if ((number ? parseFloat(x.innerText) : x.innerText.toLowerCase())
                > (number ? parseFloat(y.innerText) : y.innerText.toLowerCase())) {
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if ((number ? parseFloat(x.innerText) : x.innerText.toLowerCase())
                < (number ? parseFloat(y.innerText) : y.innerText.toLowerCase())) {
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
          if (switchcount == 0 && dir == (ascending ? "asc" : "desc")) {
            dir = (ascending ? "desc" : "asc");
            switching = true;
          }
        }
      }
    sortArrow(column, dir);
}

function sortArrow(column, dir) {
    var headers = document.getElementsByClassName("sort");
    for (var i = 0; i < headers.length; i++) {
        if (headers[i].classList.length == 2) {
            headers[i].classList.remove("asc");
            headers[i].classList.remove("desc");
        }
    }
    headers[column].classList.add(dir);
    //console.log(headers);
}


function createRankTable(field) {
  let table = document.getElementById("rankingTable");
  //console.log(selitteet);
  for (let alue of data) {
    let row = createTableRow(alue.nimi, alue.id, alue[field]);
    table.appendChild(row);
  }
}


//tekee parametreina annetuista arvoista ranking -taulukkoon header rivin.
function createTableHeaders(field) {
  let table = document.getElementById("rankingTable");

  let headerRow = document.createElement("tr");
  headerRow.id = "headers";

  let nimi = createHeader(0, "Alue");
  let id = createHeader(1, "Postinumero");
  let header = createHeader(2, selitteet[field]);
  headerRow.appendChild(nimi);
  headerRow.appendChild(id);
  headerRow.appendChild(header);

  table.appendChild(headerRow);
}


//tekee parametrina annetusta tekstistä yksittäisen headerin ja asettaa sille vastaavan rivin sorting.
function createHeader(column, text) {
  let th = document.createElement("th");
  th.onclick = function (){
    if (column == 0) {
      sortRanking(column, false, true);
    }
    if (column == 1) {
      sortRanking(column, true, true);
    }
    if (column == 2) {
      sortRanking(column, true, false);
    }
  };
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  div.setAttribute("class", "sort");
  th.appendChild(div);
  return th;
}
function createTableRow(name, id, text) {
  let row = document.createElement("tr");
  row.appendChild(createLinkField(name, id));
  row.appendChild(createLinkField(id, id));
  row.appendChild(createTableField(text));
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

function createTableField(text) {
    let td = document.createElement("td");
    let nimi = document.createTextNode(text);
    td.appendChild(nimi);
    return td;
}

function createFieldSelector() {
  let container = document.getElementById("fieldSelector");
  for (let selite in selitteet) {
    for (let layer of layers) {
      if (selite == layer) {
        let option = document.createElement("option");
        option.value = selite;
        option.appendChild(document.createTextNode(selitteet[selite]));
        container.appendChild(option);
      }
    }
  }
  container.value = oletus;
  container.onchange = function() {
    changeField(container.value);
    sortRanking(2, true, false);
  };
}

//Kutsutaan kun dropdown valikon arvo muuttuu
function changeField(selection) {
  clearTable();
  createTableHeaders(selection);
  createRankTable(selection);

  console.log(selitteet[selection]);

  setActiveLayer(selitteet[selection]);
}

function addField() {
  let selector = document.getElementById("fieldSelector");
  console.log(selector.value);
  changeField(selector.value);
}

function clearTable() {
  let table = document.getElementById("rankingTable");
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function getMap() {
  let iframe = document.getElementById('mapFrame');
  let innerDoc = iframe.contentDocument || iframe.contentWindow.document; //iframen dokumentti
  let lc=innerDoc.getElementsByClassName('leaflet-control-layers');
  lc[0].style.visibility = 'hidden';//layer control piiloon
  let mapp=innerDoc.getElementById('mapFrame');

  var s = window.matchMedia("(max-width: 700px)");
  let lc2=innerDoc.getElementsByClassName('legend leaflet-control');
   if (s.matches) {
     lc2[0].style.width = '70%';
     lc2[0].style.transform = 'scale(0.6,0.9)';
    }


  let overlays = innerDoc.getElementsByClassName("leaflet-control-layers-overlays");
  for (let label of overlays[0].childNodes) {
    console.log(label.textContent);
  }
  setActiveLayer(selitteet[oletus]);
}

//Asettaa aktiivisen layerin iframessa olevalle kartalle
function setActiveLayer(layer) {
  let iframe = document.getElementById('mapFrame');
  let innerDoc = iframe.contentDocument || iframe.contentWindow.document; //iframen dokumentti

  let overlays = innerDoc.getElementsByClassName("leaflet-control-layers-overlays");
  for (let label of overlays[0].childNodes) {
    if (label.textContent.includes(layer)) {
      if (label.childNodes[0].childNodes[0].checked == false) {
        label.childNodes[0].childNodes[0].click();
      }
      console.log(label.childNodes[0]);
      console.log(("layer: " + layer));
    } else if (label.childNodes[0].childNodes[0].checked == true) {
      label.childNodes[0].childNodes[0].click();
    }
  }
}
