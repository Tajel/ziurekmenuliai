function myFunction1() {
    var  paj, table, table1, tr, tr1, td, td1;
    var suma = new Number();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td.innerHTML > 0) {
            td = new Number(td.innerHTML)
            suma1 +=td
        $("h6")[0].innerHTML = suma
        }
    }
}

function myFunction2() {
    var suma1 = new Number();
    table1 = document.getElementById("myTable1");
    tr1 = table1.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td1 = tr[i].getElementsByTagName("td")[1];
        if (td1.innerHTML > 0) {
            td1 = new Number(td1.innerHTML)
            suma1 +=td1
        $("h6")[1].innerHTML = suma1
        }
    }
}