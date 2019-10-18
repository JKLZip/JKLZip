'use strict'
// pie chart
google.charts.load('current', {'packages':['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

	//var data = new google.visualization.DataTable(jsonData);
	var data = google.visualization.arrayToDataTable([
	  ['Tiedot', 'Määrä'],
	  ['Miehet',     8511],
	  ['Naiset',      13442],
	  ['Lapset',  3424],
	  ['Opiskelijat', 5452],
	]);

	var options = {
	  title: 'Dataa',
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
	["0-3v", 1115],
	["4-6v", 2222],
	["7-10v", 2313],
	["11-15v", 7874],
	["15-18v", 9995],
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
