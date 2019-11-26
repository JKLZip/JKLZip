//console.log(alueet);

createSearch();
listAlueet(alueet);

function listAlueet(al) {
    var div = document.getElementById("alueet");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    for (let i = 0; i < al.length; i++) {
        var a = document.createElement("a");
        var text = document.createTextNode(al[i].nimi + " (" + al[i].id + ")");
        a.setAttribute("href", "/alue?pnro=" + al[i].id);
        a.appendChild(text);
        div.appendChild(a);
    }
}

function createSearch() {
    var input = document.getElementById("input");

    input.addEventListener("input", function (e) {
        find();
    });

    input.addEventListener("keypress", function (e) {
        if (e.keyCode == 13) {
             e.preventDefault();
        }
    });
}

function find() {
    var input = document.getElementById("input");
    var found = [];
    for (let i = 0; i < alueet.length; i++) {
        if (alueet[i].nimi.toLowerCase().includes(input.value.toLowerCase()) || alueet[i].id.toLowerCase().includes(input.value.toLowerCase())) {
            found.push(alueet[i]);
        }
    }
    listAlueet(found);
}
