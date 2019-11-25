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
google.charts.setOnLoadCallback(drawPalvelutyopaikatChart);

window.onload = function() {
    firstCollapsible();
}
collapse();


function firstCollapsible(){
    var el = document.getElementById('first_collapsible');
    el.style.maxHeight = el.scrollHeight + "px";
}

function collapse(){
    var coll = document.getElementsByClassName("collapsible");

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            var content = this.nextElementSibling;
	        if(this.classList.length == 2) {
			    this.classList.remove("active");
				content.style.maxHeight = null;
			} else {
                this.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}

function drawSukupuoliChart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.He_miehet, aluedata.He_miehet],
        [selitteet.He_naiset, aluedata.He_naiset],
    ]);
    var options = {
        title: 'Sukupuolijakauma',
        backgroundColor: 'transparent',
        titleTextStyle: { color: 'black' },
        legend: { width: 30},
        chartArea: { left: '1%', top: '10%', bottom: '5%', width: '100%', height: '70%'},
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_sukupuoli'));
    chart.draw(data, options);
}

function drawIkarakenneChart() {
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Ikä');
    data.addColumn('number', 'Määrä');

    data.addRows([
        ['0-2-vuotiaat', aluedata.He_0_2],
        ['3-6-vuotiaat', aluedata.He_3_6],
        ['7-12-vuotiaat', aluedata.He_7_12],
        ['13-15-vuotiaat', aluedata.He_13_15],
        ['16-17-vuotiaat', aluedata.He_16_17],
        ['18-19-vuotiaat', aluedata.He_18_19],
        ['20-24-vuotiaat', aluedata.He_20_24],
        ['25-29-vuotiaat', aluedata.He_25_29],
        ['30-34-vuotiaat', aluedata.He_30_34],
        ['35-39-vuotiaat', aluedata.He_35_39],
        ['40-44-vuotiaat', aluedata.He_40_44],
        ['45-49-vuotiaat', aluedata.He_45_49],
        ['50-54-vuotiaat', aluedata.He_50_54],
        ['55-59-vuotiaat', aluedata.He_55_59],
        ['60-64-vuotiaat', aluedata.He_60_64],
        ['65-69-vuotiaat', aluedata.He_65_69],
        ['70-74-vuotiaat', aluedata.He_70_74],
        ['75-79-vuotiaat', aluedata.He_75_79],
        ['80-84-vuotiaat', aluedata.He_80_84],
        ['85 vuotta täyttäneet', aluedata.He_85_],
    ]);

    var options = {
        title: 'Ikäjakauma, 2017',
        hAxis: {
            title: 'Ikä',
            format: 'string',
            titleTextStyle: { color: 'black' },
            gridlines: { color: 'white', count: -1},
            textStyle: { color: 'black'},
        },
        vAxis: {
            title: 'Määrä',
            titleTextStyle: { color: 'black' },
            baselineColor: '#dbdbdb',
            textStyle: { color: 'black'},
        },
        backgroundColor: { fill: 'transparent'},
        titleTextStyle: { color: 'black' },
        legend: { position: 'none'},
        bar: {groupWidth: '80%'},
        chartArea: { left: '15%', top: '10%', bottom: '30%', right: '2%', width: '85%', height: '50%', backgroundColor: '#dbdbdb'},
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_ikajakauma'));

    chart.draw(data, options);
}

function drawTuloluokatChart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Hr_pi_tul, aluedata.Hr_pi_tul],
        [selitteet.Hr_ke_tul, aluedata.Hr_ke_tul],
        [selitteet.Hr_hy_tul, aluedata.Hr_hy_tul],
    ]);

    var options = {
        title: 'Tuloluokat',
        backgroundColor: { fill: 'transparent'},
        titleTextStyle: { color: 'black' },
        legend: { textStyle: { color: 'black'}},
        chartArea: { left: '1%', top: '10%', bottom: '5%', width: '100%', height: '70%'},
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
        titleTextStyle: { color: 'black' },
        legend: { textStyle: { color: 'black'}},
        chartArea: { left: '1%', top: '10%', bottom: '5%', width: '100%', height: '70%'},
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
        [selitteet.Pt_muut, aluedata.Pt_muut]
    ]);

    var options = {
        title: 'Väestön jakautuminen',
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: { color: 'black' },
        legend: { textStyle: { color: 'black'}},
        chartArea: { left: '1%', top: '10%', bottom: '5%', width: '100%', height: '70%'},
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_vaesto'));

    chart.draw(data, options);
}

function drawAsuminenChart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Ra_kt_as, aluedata.Ra_kt_as],
        [selitteet.Ra_pt_as, aluedata.Ra_pt_as],
    ]);

    var options = {
        title: 'Asunnot',
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: { color: 'black' },
        legend: { textStyle: { color: 'black'}},
        chartArea: { left: '1%', top: '10%', bottom: '5%', width: '100%', height: '70%'},
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_asuminen'));

    chart.draw(data, options);
}
function drawTaloudet1Chart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Te_aik, aluedata.Te_aik],
        [selitteet.Te_laps, aluedata.Te_laps],
        [selitteet.Te_plap, aluedata.Te_plap],
        [selitteet.Te_aklap, aluedata.Te_aklap],
        [selitteet.Te_klap, aluedata.Te_klap],
        [selitteet.Te_teini, aluedata.Te_teini],
        [selitteet.Te_nuor, aluedata.Te_nuor],
        [selitteet.Te_eil_np, aluedata.Te_eil_np],
        [selitteet.Te_elak, aluedata.Te_elak],
    ]);

    var options = {
        title: 'Alueen taloudet',
        hAxis: {
            gridlines: { color: 'white', count: -1},
            textStyle: { color: 'black'},
        },
        vAxis: {
            baselineColor: '#dbdbdb',
            textStyle: { color: 'black', fontSize: 12},
        },
        backgroundColor: { fill: 'transparent'},
        titleTextStyle: { color: 'black' },
        legend: { position: 'none'},
        bar: {groupWidth: '80%'},
        chartArea: { left: '25%', right: '2%', width: '70%', height: '80%', backgroundColor: '#dbdbdb'},
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_taloudet1'));

    chart.draw(data, options);
}

function drawTaloudet2Chart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Te_omis_as, aluedata.Te_omis_as],
        [selitteet.Te_vuok_as, aluedata.Te_vuok_as],
        [selitteet.Te_muu_as, aluedata.Te_muu_as],
    ]);

    var options = {
        title: 'Taloudet',
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: { color: 'black' },
        legend: { textStyle: { color: 'black'}},
        chartArea: { left: '1%', top: '10%', bottom: '5%', width: '100%', height: '70%'},
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_taloudet2'));

    chart.draw(data, options);
}

function drawTyollisyysChart() {
    var data = google.visualization.arrayToDataTable([
        ['Tiedot', 'Määrä'],
        [selitteet.Tp_alku_a, aluedata.Tp_alku_a],
        [selitteet.Tp_jalo_bf, aluedata.Tp_jalo_bf],
        [selitteet.Tp_palv_gu, aluedata.Tp_palv_gu],
    ]);

    var options = {
        title: 'Työllisyys',
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: { color: 'black' },
        legend: { textStyle: { color: 'black'}},
        chartArea: { left: '1%', top: '10%', bottom: '5%', width: '100%', height: '70%'},
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_tyollisyys'));

    chart.draw(data, options);
}

function drawPalvelutyopaikatChart() {
    var data = google.visualization.arrayToDataTable([
        ['Ala', 'Työpaikkoja'],
        ['Maatalous, metsätalous ja kalatalous', aluedata.Tp_a_maat],
        ['Kaivostoiminta ja louhinta', aluedata.Tp_b_kaiv],
        ['Teollisuus', aluedata.Tp_c_teol],
        ['Sähkö-, kaasu- ja lämpöhuolto, jäähdytysliiketoiminta', aluedata.Tp_d_ener],
        ['Vesihuolto, viemäri- ja jätevesihuolto ja muu ympäristön puhtaanapito', aluedata.Tp_e_vesi],
        ['Rakentaminen', aluedata.Tp_f_rake],
        ['Tukku- ja vähittäiskauppa; moottoriajoneuvojen ja moottoripyörien korjaus', aluedata.Tp_g_kaup],
        ['Kuljetus ja varastointi', aluedata.Tp_h_kulj],
        ['Majoitus- ja ravitsemistoiminta', aluedata.Tp_i_majo],
        ['Informaatio ja viestintä', aluedata.Tp_j_info],
        ['Rahoitus- ja vakuutustoiminta', aluedata.Tp_k_raho],
        ['Kiinteistöalan toiminta', aluedata.Tp_l_kiin],
        ['Ammatillinen, tieteellinen ja tekninen toiminta', aluedata.Tp_m_erik],
        ['Hallinto- ja tukipalvelutoiminta', aluedata.Tp_n_hall],
        ['Julkinen hallinto ja maanpuolustus; pakollinen sosiaalivakuutus', aluedata.Tp_o_julk],
        ['Koulutus', aluedata.Tp_p_koul],
        ['Terveys- ja sosiaalipalvelut', aluedata.Tp_q_terv],
        ['Taiteet, viihde ja virkistys', aluedata.Tp_r_taid],
        ['Muu palvelutoiminta', aluedata.Tp_s_muup],
        ['Kotitalouksien toiminta työnantajina; kotitalouksien eriyttämätön toiminta tavaroiden ja palveluiden tuottamiseksi omaan käyttöön', aluedata.Tp_t_koti],
        ['Kansainvälisten organisaatioiden ja toimielinten toiminta', aluedata.Tp_u_kans],
        ['Toimiala tuntematon', aluedata.Tp_x_tunt],
   ]);

    var options = {
        title: 'Työpaikat aloittain, 2016',
        hAxis: {
            gridlines: { color: 'white', count: -1},
            textStyle: { color: 'black'},
        },
        vAxis: {
            baselineColor: '#dbdbdb',
            textStyle: { color: 'black', fontSize: 11},
        },
        backgroundColor: { fill: 'transparent'},
        titleTextStyle: { color: 'black' },
        legend: { position: 'none'},
        bar: {groupWidth: '80%'},
        chartArea: { left: '25%', right: '2%', width: '70%', height: '80%', backgroundColor: '#dbdbdb'},
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_palvelutyopaikat'));

    chart.draw(data, options);
}