'use strict';
setThemeOnload();
document.getElementById('changeThemeButton').onclick = function() {
  let theme = document.getElementById('theme');
  let cookiesAllowed;
  if (document.cookie.trim().length === 0) {
    let cookiePromptText = "Sallitko evästeet(cookiet)? Sivu käyttää niitä ainoastaan halutun teeman tallentamiseen ja ne poistuvat, kun selain suljetaan.";//todo: hyvä teksti
    cookiesAllowed = confirm(cookiePromptText);
  }
  if (cookiesAllowed == null) {
    console.log("Cookies not allowed");
  }
    if(document.cookie.trim().length === 0) {
      document.cookie = "theme=light";
    }
    console.log(document.cookie);
    let oldTheme = document.cookie.split("=")[1];
    console.log("vanha teema " + oldTheme);
  if (oldTheme ==="dark") {
    applyTheme("light");
    document.cookie = "theme=light";
  } else if (oldTheme==="light"){
    applyTheme("dark");
    document.cookie = "theme=dark";
  }
};

function applyTheme(theme) {
  if (theme === "dark") {
    document.getElementById("theme").href = "/static/style.css";

  }
  else if(theme === "light") {
        document.getElementById("theme").href = "/static/light.css";
  }
}
function setThemeOnload() {
  let theme = document.cookie.trim().split("=")[1];
  if (theme === "dark") {
    applyTheme("dark");
  }else if (theme === "light") {
    applyTheme("light");
  }
} //todo: refaktoroi