function myFunction1() {
  var ikainis, data, kiekis, suma;
  data = $("#ikainis")
    .val()
    .split(",");
  kiekis = $("#kiekis").val();
  suma = kiekis * data[2];
  // $(".sumeur").text(suma);
  $("#sumeur").val(suma);
}

function myFunction2() {}
