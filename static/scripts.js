'use strict';
//todo: teeman vaihtaminen cookieen ja ilmoitus cookiesta tarvittaessa. Pelkästään session cookieita.
document.getElementById('changeThemeButton').onclick = function() {
  let theme = document.getElementById('theme');
  if (theme.href.includes("/static/style.css")) {
    theme.href = "/static/light.css";
    console.log("light");
  } else {
    theme.href = "/static/style.css";
    console.log("dark",  document.getElementById('theme').href);
  }
};