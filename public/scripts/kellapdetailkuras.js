function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
addLoadEvent(myFunction2(), myFunction3());
addLoadEvent(function() {
  /* more code to run on page load */
});





function myFunction2() {
    var  table, tr, td;
    var suma = new Number();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td.innerHTML > 0) {
            td = new Number(td.innerHTML)
            suma +=td
        $("h6")[0].innerHTML = suma
        }
    }
}

function myFunction3() {
    var table, tr, td;
    var suma = new Number();
    table = document.getElementById("myTable1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td.innerHTML > 0) {
            td = new Number(td.innerHTML)
            suma +=td
        $("h6")[1].innerHTML = suma
        }
    }
}