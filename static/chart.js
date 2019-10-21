'use strict'
console.log(selitteet);
console.log(aluedata);
// pie chart
google.charts.load('current', {'packages':['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

	//var data = new google.visualization.DataTable(jsonData);
	var data = google.visualization.arrayToDataTable([
	  ['Tiedot', 'Määrä'],
	  [selitteet.He_miehet, aluedata.He_miehet],
	  [selitteet.He_naiset, aluedata.He_naiset],
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
        [selitteet.He_85, aluedata.He_85],
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
