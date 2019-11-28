'use strict'
window.onload = function() {

    if(sessionStorage.length != 0){
        for(var i=0;i<sessionStorage.length;i++){
            var h = getStorage("id" + i);
            document.getElementById(h).classList.add("active");
            document.getElementById(h).nextElementSibling.style.maxHeight = document.getElementById(h).nextElementSibling.scrollHeight + "px";
        }

  /*  if(document.cookie.trim().length != 0){
        for(var i=0;i<9;i++){
            var h = haeKeksi("id" + i);
            console.log("onload " + h);
            document.getElementById(h).classList.add("active");
            document.getElementById(h).nextElementSibling.style.maxHeight = document.getElementById(h).nextElementSibling.scrollHeight + "px";;
        }
  */} else{
        if(document.getElementById('first_collapsible')){
            firstCollapsible();
        }
      }


}
collapse();

function firstCollapsible(){
        var el = document.getElementById('first_collapsible');
        el.previousElementSibling.classList.add("active");
        el.style.maxHeight = el.scrollHeight + "px";
        //asetaKeksi();
}

function collapse(){
    var s = window.matchMedia("(max-width: 600px)");
    var coll = document.getElementsByClassName("collapsible");

    if (s.matches) {
        document.getElementById('alueet_menu').classList.add("collapsible");
        document.getElementById('menu_elements').classList.add("kaaviot");
    }

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            var content = this.nextElementSibling;
	        if(this.classList.length == 2) {
			    this.classList.remove("active");
				content.style.maxHeight = null;
				deleteStorage();
				//asetaKeksi();
			} else {
                this.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
                setStorage();
                //asetaKeksi();
            }
        });
    }
}

function menu_collapse(s) {
  if (s.matches) {
    var e = document.getElementById('alueet_menu');
    e.classList.add("collapsible");
  }
}

function setStorage(){
    var lista = document.getElementsByClassName('collapsible active');

    for(var i=0;i<lista.length;i++){

        sessionStorage.setItem("id" + i, lista[i]);
    }
}

function getStorage(cname){
    sessionStorage.getItem(cname);
}

function deleteStorage(cname){
    sessionStorage.removeItem(cname);
}

/*
//funktio on haettu https://www.w3schools.com/js/js_cookies.asp
function haeKeksi(id){
    var id = id +"=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var dc = decodedCookie.split(';');
    console.log("dc: "+dc);
    for(var i = 0; i < dc.length; i++) {
        var c = dc[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(id) == 0) {
            return c.substring(id.length, c.length);
        }
    }
    return "";
}

function asetaKeksi(){
    var lista = document.getElementsByClassName("collapsible active");
    console.log(lista);
    if(lista.length > 0){
        for(var i=0; i<lista.length;i++){
            var id = lista[i].id;
            console.log(id);
            document.cookie = "id" + i + "="+ id + ";path=/";
        }
    } else{
        document.cookie = "id0=perustiedot; path=/";
    }
    console.log(document.cookie);
}
*/