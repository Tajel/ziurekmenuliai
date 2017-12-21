// function addLoadEvent(func) {
//     var oldonload = window.onload;
//     if (typeof window.onload != 'function') {
//         window.onload = func;
//     } else {
//         window.onload = function() {
//             if (oldonload) {
//                 oldonload();
//             }
//             func();
//         }
//     }
// }
// addLoadEvent(myFunction2(), myFunction3());
// addLoadEvent(function() {
//     /* more code to run on page load */
// });

function myFunction2() {
  var pajamos, data, td;
  var suma = new Number();
  row = document.getElementsByClassName("pajamos");
  for (i = 0; i < row.length; i++) {
    data = row[i].innerText;
    if (data > 0) {
      td = new Number(data);
      suma += td;
      $(".pajsuma")[0].innerText = suma;
    }
  }
}

function myFunction3() {
  var kuras, data, td;
  var suma = new Number();
  row = document.getElementsByClassName("kuras");
  for (i = 0; i < row.length; i++) {
    data = row[i].innerText;
    if (data > 0) {
      td = new Number(data);
      suma += td;
      $(".kursuma")[0].innerText = suma;
    }
  }
}
