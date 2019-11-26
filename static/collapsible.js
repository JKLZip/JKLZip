'use strict'
window.onload = function() {
    if(document.getElementById('first_collapsible')){
        firstCollapsible();
    }
}
collapse();

function firstCollapsible(){
    var el = document.getElementById('first_collapsible');
    el.style.maxHeight = el.scrollHeight + "px";
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
			} else {
                this.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
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