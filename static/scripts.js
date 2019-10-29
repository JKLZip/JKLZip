'use strict';

document.getElementById('changeThemeButton').onclick = function() {
  if (document.getElementById('theme').href.includes("/static/style.css")) {
    document.getElementById('theme').href = "/static/light.css";
    console.log("light");
  } else {
    document.getElementById('theme').href = "/static/style.css";
    console.log("dark",  document.getElementById('theme').href);
  }
};