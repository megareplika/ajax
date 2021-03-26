$(document).ready(function () {
    $('#terulet2').delegate('table th', 'click', rendez);
    $('#terulet2').delegate('button', 'click', torol);
    $('#mezo').keyup(beolvas);
});

var eredmnyek = [];
var sorrend = false;

function rendez() {
    //console.log("rendezés");
    var id = $(this).attr("id");
    if (sorrend) {
        eredmnyek.sort(function (a, b) {
            return Number(a[id] > b[id]) - 0.5;
        });
    } else {
        eredmnyek.sort(function (a, b) {
            return Number(a[id] < b[id]) - 0.5;
        });
    }
    sorrend = !sorrend;
    tablazatkiir();
}

function torol() {
    $.ajax(
            {
                type: "DELETE",
                url: "torol.php?ID=" + $(this).attr("id"),
                success: function (result) {
                    beolvas();
                    alert("Töröltem");
                },
                error: function () {
                    alert("Hiba az adatok betöltésekor");
                }
            });
}

function kiir() {
    var HTMLtartalom = "<select>";
    for (var ered in eredmnyek) {
        HTMLtartalom += "<option>" + eredmnyek[ered].nev + "</option>";
//        console.log(eredmnyek[ered].nev);
    }
    HTMLtartalom += "</select>";
    $("#terulet").html(HTMLtartalom);
//    $("#terulet").innerHTML = HTMLtartalom;
    tablazatkiir();
}

function tablazatkiir() {
    var HTMLtablazatTartalom = "<table><tr><th id ='nev'>Városnév</th><th id='jaras'>Járás</th><th id='megye'>Megye</th><th></th></tr>";
    for (var ered in eredmnyek) {
        HTMLtablazatTartalom += "<tr><td>" + eredmnyek[ered].nev + "</td><td>" + eredmnyek[ered].jaras + "</td><td>" + eredmnyek[ered].megye + "</td>\n\
<td><button id='"+eredmnyek[ered].ID+"' >Torles</button><button data_id='"+eredmnyek[ered].ID+"' >Modosit</button></td></tr> ";
    }
    HTMLtablazatTartalom += "</table>";
    $('#terulet2').html(HTMLtablazatTartalom);
}


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