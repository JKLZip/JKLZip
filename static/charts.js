'use strict'
console.log(selitteet);
console.log(aluedata);

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawSukupuoliChart);
google.charts.setOnLoadCallback(drawIkarakenneChart);
google.charts.setOnLoadCallback(drawTuloluokatChart);
google.charts.setOnLoadCallback(drawKoulutusChart);
google.charts.setOnLoadCallback(drawVaestoChart);
google.charts.setOnLoadCallback(drawAsuminenChart);
google.charts.setOnLoadCallback(drawTaloudet1Chart);
google.charts.setOnLoadCallback(drawTaloudet2Chart);
google.charts.setOnLoadCallback(drawTyollisyysChart);

collapse();
panels();

function collapse(){
    var coll = document.getElementsByClassName("collapsible");

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
		    for (var j = 0; j < coll.length; j++){
			    if(coll[j].classList.length == 2) {
				    var clicked = coll[j];
					coll[j].classList.remove("active");
					coll[j].nextElementSibling.style.maxHeight = null;
				}
			}
			if (clicked != this){
			    this.classList.add("active");
				var content = this.nextElementSibling;
				if (content.style.maxHeight){
				    content.style.maxHeight = null;
				} else {
				    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    }
}

function panels(){
    var keski_ika = aluedata.He_kika;
    document.getElementById("keski_ika").textContent += keski_ika + " vuotta.";

    var as_tulot = aluedata.Hr_ktu;
    document.getElementById("as_tulot").textContent += as_tulot + " €.";

    var koulutetut = aluedata.Ko_koul;
    document.getElementById("koulutetut").textContent += koulutetut +".";

    var as_kpinta_ala = aluedata.Ra_as_kpa;
    document.getElementById("as_kpinta_ala").textContent += as_kpinta_ala + " neliötä.";

    var t_lkm = aluedata.Te_taly;
    document.getElementById("t_lkm").textContent += t_lkm + ".";

    var t_keskikoko = aluedata.Te_takk;
    document.getElementById("t_keskikoko").textContent += t_keskikoko + " asukasta.";
}


function drawSukupuoliChart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.He_miehet, aluedata.He_miehet],
        [selitteet.He_naiset, aluedata.He_naiset],
    ]);

    var options = {
        title: 'Sukupuolijakauma',
        backgroundColor: { fill: 'transparent'},
        titleTextStyle: { color: 'white' },
        legend: { textStyle: {color: 'white'}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_sukupuoli'));

    chart.draw(data, options);
}

function drawIkarakenneChart() {
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Ikä');
    data.addColumn('number', 'Määrä');

    data.addRows([
        [selitteet.He_0_2, aluedata.He_0_2],
        [selitteet.He_3_6, aluedata.He_3_6],
        [selitteet.He_7_12, aluedata.He_7_12],
        [selitteet.He_13_15, aluedata.He_13_15],
        [selitteet.He_16_17, aluedata.He_16_17],
        [selitteet.He_18_19, aluedata.He_18_19],
        [selitteet.He_20_24, aluedata.He_20_24],
        [selitteet.He_25_29, aluedata.He_25_29],
        [selitteet.He_30_34, aluedata.He_30_34],
        [selitteet.He_35_39, aluedata.He_35_39],
        [selitteet.He_40_44, aluedata.He_40_44],
        [selitteet.He_45_49, aluedata.He_45_49],
        [selitteet.He_50_54, aluedata.He_50_54],
        [selitteet.He_55_59, aluedata.He_55_59],
        [selitteet.He_60_64, aluedata.He_60_64],
        [selitteet.He_65_69, aluedata.He_65_69],
        [selitteet.He_70_74, aluedata.He_70_74],
        [selitteet.He_75_79, aluedata.He_75_79],
        [selitteet.He_80_84, aluedata.He_80_84],
        [selitteet.He_85_, aluedata.He_85_],
   ]);

    var options = {
        title: 'Ikäjakauma',
        hAxis: {
            title: 'Ikä',
            format: 'string',
            titleTextStyle: { color: '#dbdbdb' },
            gridlines: { color: 'white', count: -1},
            textStyle: { color: '#dbdbdb'},
        },
        vAxis: {
            title: 'Lukumäärä',
            titleTextStyle: { color: '#dbdbdb' },
            baselineColor: '#dbdbdb',
            textStyle: { color: '#dbdbdb'},
        },
        backgroundColor: { fill: 'transparent'},
        titleTextStyle: { color: 'white' },
        legend: { position: 'none'},
        bar: {groupWidth: '80%'},
        colors: ['#38d960'],
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_ikajakauma'));

    chart.draw(data, options);
}

function drawTuloluokatChart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Hr_hy_tul, aluedata.Hr_hy_tul],
        [selitteet.Hr_ke_tul, aluedata.Hr_ke_tul],
        [selitteet.Hr_pi_tul, aluedata.Hr_pi_tul],
    ]);

    var options = {
        title: 'Tuloluokat',
        backgroundColor: { fill: 'transparent'},
        titleTextStyle: { color: 'white' },
        legend: { textStyle: {color: 'white'}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_tuloluokat'));

    chart.draw(data, options);
}

function drawKoulutusChart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Ko_perus, aluedata.Ko_perus],
        [selitteet.Ko_ammat, aluedata.Ko_ammat],
        [selitteet.Ko_yliop, aluedata.Ko_yliop],
        [selitteet.Ko_al_kork, aluedata.Ko_al_kork],
        [selitteet.Ko_yl_kork, aluedata.Ko_yl_kork],
    ]);

    var options = {
        title: 'Koulutus',
        backgroundColor: { fill: 'transparent'},
        titleTextStyle: { color: 'white' },
        legend: { textStyle: {color: 'white'}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_koulutus'));

    chart.draw(data, options);
}

function drawVaestoChart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Pt_0_14, aluedata.Pt_0_14],
        [selitteet.Pt_opisk, aluedata.Pt_opisk],
        [selitteet.Pt_tyoll, aluedata.Pt_tyoll],
        [selitteet.Pt_tyott, aluedata.Pt_tyott],
        [selitteet.Pt_elakel, aluedata.Pt_elakel],
    ]);

    var options = {
        title: 'Väestön jakautuminen',
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: { color: 'white' },
        legend: { textStyle: {color: 'white'}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_vaesto'));

    chart.draw(data, options);
}

function drawAsuminenChart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Ra_ke, aluedata.Ra_ke],
        [selitteet.Ra_kt_as, aluedata.Ra_kt_as],
        [selitteet.Ra_pt_as, aluedata.Ra_pt_as],
    ]);

    var options = {
        title: 'Asuminen',
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: { color: 'white' },
        legend: { textStyle: {color: 'white'}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_asuminen'));

    chart.draw(data, options);
}

function drawTaloudet1Chart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Te_aik, aluedata.Te_aik],
        [selitteet.Te_aklap, aluedata.Te_aklap],
        [selitteet.Te_eil_np, aluedata.Te_eil_np],
        [selitteet.Te_elak, aluedata.Te_elak],
        [selitteet.Te_klap, aluedata.Te_klap],
        [selitteet.Te_laps, aluedata.Te_laps],
        [selitteet.Te_nuor, aluedata.Te_nuor],
    ]);

    var options = {
        title: 'Taloudet',
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: { color: 'white' },
        legend: { textStyle: {color: 'white'}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_taloudet1'));

    chart.draw(data, options);
}

function drawTaloudet2Chart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Te_omis_as, aluedata.Te_omis_as],
        [selitteet.Te_vuok_as, aluedata.Te_vuok_as],
    ]);

    var options = {
        title: 'Taloudet',
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: { color: 'white' },
        legend: { textStyle: {color: 'white'}},
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_taloudet2'));

    chart.draw(data, options);
}

function drawTyollisyysChart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Tp_alku_a, aluedata.Tp_alku_a],
        [selitteet.Tp_c_teol, aluedata.Tp_c_teol],
        [selitteet.Tp_palv_gu, aluedata.Tp_palv_gu],
    ]);

    var options = {
        title: 'Työllisyys',
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: { color: 'white' },
        legend: { textStyle: {color: 'white'}}
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_tyollisyys'));

    chart.draw(data, options);
}
