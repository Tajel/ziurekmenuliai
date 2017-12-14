function myFunction1() {
  var input, filter, row, data, i;
  input = document.getElementById("myInput1");
  filter = input.value.toUpperCase();
  row = document.getElementsByClassName("kellap-data__row");
  for (i = 0; i < row.length; i++) {
    data = row[i].getElementsByTagName("div")[0];
    if (data) {
      if (data.innerHTML.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }
}
function myFunction2() {
  var input, filter, row, data, i;
  input = document.getElementById("myInput2");
  filter = input.value.toUpperCase();
  row = document.getElementsByClassName("kellap-data__row");
  for (i = 0; i < row.length; i++) {
    data = row[i].getElementsByTagName("div")[3];
    if (data) {
      if (data.innerHTML.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }
}

function myFunction3() {
  var input, filter, row, data, i;
  input = document.getElementById("myInput3");
  filter = input.value.toUpperCase();
  row = document.getElementsByClassName("kellap-data__row");
  for (i = 0; i < row.length; i++) {
    data = row[i].getElementsByTagName("div")[6];
    if (data) {
      if (data.innerHTML.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }
}

function myFunction4() {
  var input, filter, row, data, i;
  input = document.getElementById("myInput4");
  filter = input.value.toUpperCase();
  row = document.getElementsByClassName("kellap-data__row");
  for (i = 0; i < row.length; i++) {
    data = row[i].getElementsByTagName("div")[7];
    if (data) {
      if (data.innerHTML.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }
}

function myFunction5() {
  var input, filter, row, data, i;
  input = document.getElementById("myInput5");
  filter = input.value.toUpperCase();
  row = document.getElementsByClassName("kellap-data__row");
  for (i = 0; i < row.length; i++) {
    data = row[i].getElementsByTagName("div")[5];
    if (data) {
      if (data.innerHTML.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }
}

function myFunction6() {
  var input, filter, row, data, i;
  input = document.getElementById("myInput6");
  filter = input.value.toUpperCase();
  row = document.getElementsByClassName("kellap-data__row");
  for (i = 0; i < row.length; i++) {
    data = row[i].getElementsByTagName("div")[4];
    if (data) {
      if (data.innerHTML.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }
}
function myFunction7() {
  var input, filter, row, data, i;
  input = document.getElementById("myInput7");
  filter = input.value.toUpperCase();
  row = document.getElementsByClassName("kellap-data__row");
  for (i = 0; i < row.length; i++) {
    data = row[i].getElementsByTagName("div")[4];
    if (data) {
      if (data.innerHTML.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }
}

// function myFunction7() {
//   var input, filter, table, tr, td, i;
//   input = document.getElementById("myInput7");
//   filter = input.checked;
//   table = document.getElementById("myTable");
//   tr = table.getElementsByTagName("tr");
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("input")[0];
//     if (td) {
//       if (td.checked === filter) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }
// }
