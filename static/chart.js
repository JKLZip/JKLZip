'use strict'
console.log(jkldata);
// pie chart
google.charts.load('current', {'packages':['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

	//var data = new google.visualization.DataTable(jsonData);
	var data = google.visualization.arrayToDataTable([
	  ['Tiedot', 'Määrä'],
	  ['Miehet',  jkldata.He_miehet],
	  ['Naiset',  jkldata.He_naiset],
	]);

	var options = {
	  title: 'Sukupuoli',
	  backgroundColor: { fill:'transparent' },
	  titleTextStyle: {color: 'white'}
	};

	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(data, options);
  }


  //column chart
  //google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Ikä');
  data.addColumn('number', 'Määrä');

      data.addRows([
        ["0-2v", jkldata.He_0_2],
        ["3-6v", jkldata.He_3_6],
        ["7-12v", jkldata.He_7_12],
        ["13-15v", jkldata.He_13_15],
        ["16-17v", jkldata.He_16_17],
        ["17-19v", jkldata.He_18_19],
        ["20-24v", jkldata.He_20_24],
        ["25-29v", jkldata.He_25_29],
        ["30-34v", jkldata.He_30_34],
        ["35-39v", jkldata.He_35_39],
        ["40-44v", jkldata.He_40_44],
        ["45-49v", jkldata.He_45_49],
        ["50-54v", jkldata.He_50_54],
        ["55-59v", jkldata.He_55_59],
        ["60-64v", jkldata.He_60_64],
        ["65-69v", jkldata.He_65_69],
        ["70-74v", jkldata.He_70_74],
        ["75-79v", jkldata.He_75_79],
        ["80-84v", jkldata.He_80_84],
        ["85-v", jkldata.He_85],
      ]);
  var options = {
	title: 'Ikäjakauma',
	hAxis: {
	  title: 'Ikäjakauma',
	  format: 'string',
	},
	vAxis: {
	  title: 'Lukumäärä'
	},
	backgroundColor: { fill:'transparent' },
	titleTextStyle: {color: 'white'}
  };

  var chart = new google.visualization.ColumnChart(
	document.getElementById('chart_div'));

  chart.draw(data, options);
}
