
function kiir() {
    var HTMLtartalom = "<select>";
    for (var ered in eredmnyek) {
        HTMLtartalom+= "<option>"+eredmnyek[ered].nev+"</option>";
//        console.log(eredmnyek[ered].nev);
    }
    HTMLtartalom += "</select>";
    $("#terulet").html(HTMLtartalom);
//    $("#terulet").innerHTML = HTMLtartalom;
}


$(document).ready(function () {
    $('#mezo').keyup(beolvas);
});

var eredmnyek = [];

function beolvas() {
    $.ajax(
            {
                type: "GET",
                url: "lekerdez.php?mezo=" + $("#mezo").val(),
                success: function (result) {
                    eredmnyek = JSON.parse(result);
//                    console.log(eredmnyek);
                    kiir();
                },
                error: function () {
                    alert("Hiba az adatok betöltésekor");
                }
            });
}