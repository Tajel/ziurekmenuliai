function myFunction1() {
  var ikainis, data, kiekis, suma;
  data = $("#ikainis").value.split(",");
  kiekis = $("#kiekis").value;
  suma = kiekis * data[2];
  $(".sumeur").text(suma);
  $("#sumeur").val(suma);
}

function myFunction2() {}
