


//MENU LATERALE CHIUSURA E APERTURA

function open_menu () {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("menu-sin-sidebar").style.width = "25%";
  document.getElementById("menu-sin-sidebar").style.display = "block";
  document.getElementById("apertura-nav").style.display = 'none';
}

function close_menu () {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("menu-sin-sidebar").style.display = "none";
  document.getElementById("apertura-nav").style.display = "inline-block";
}

//FINE MENU LATERALE CHIUSURA E APERTURA
