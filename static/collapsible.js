'use strict'
window.onload = function() {
    if(sessionStorage.length > 0){
        for(var i=0;i<sessionStorage.length;i++){
            var h = getStorage("id" + i);
            if(document.getElementById(h) !== null){
                document.getElementById(h).classList.add("active");
                document.getElementById(h).nextElementSibling.style.maxHeight = document.getElementById(h).nextElementSibling.scrollHeight + "px";
            }
        }
    } else{
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
        setStorage();
}

function collapse(){
    var s = window.matchMedia("(max-width: 600px)");
    var coll = document.getElementsByClassName("collapsible");

    if (s.matches) {
        var e = document.getElementById('alueet_menu');
        e.style.width = '93.9%';
        e.style.border = '2px';
        e.style.borderRadius = '2px';
        e.classList.add("collapsible");
        document.getElementById('postiNumeroLinkit').classList.add("kaaviot");
    }

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            var content = this.nextElementSibling;
	        if(this.classList.length == 2) {
			    this.classList.remove("active");
				content.style.maxHeight = null;
				deleteStorage();
			} else {
                this.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
                setStorage();
            }
        });
    }
}

function setStorage(){
    var lista = document.getElementsByClassName('collapsible active');
    for(var i=0;i<lista.length;i++){
        if(lista[i].id !== 'alueet_menu'){
            sessionStorage.setItem("id" + i, lista[i].id);
        }
    }
}

function getStorage(cname){
    var x = sessionStorage.getItem(cname);
    return x;
}

function deleteStorage(){
    sessionStorage.clear();
    setStorage();
}
