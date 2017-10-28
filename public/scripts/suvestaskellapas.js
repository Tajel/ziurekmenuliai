function myFunction1() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput7");
    if (input.checked === true){
        $('#myInput7').attr('value','checked')
    }
    if (input.checked === false){
        $('#myInput7').attr('value','')
    }
}