/*'use strict'

	// pie chart
	google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        //var data = new google.visualization.DataTable(jsonData);
        var data = google.visualization.arrayToDataTable([
          ['Tiedot', 'Määrä'],
          ['Miehet',     5511],
          ['Naiset',      3442],
          ['Lapset',  3424],
          ['Opiskelijat', 3452],
        ]);

        var options = {
          title: 'Dataa'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
	  
	  
	  //column chart
	  google.charts.load('current', {packages: ['corechart', 'bar']});
	  google.charts.setOnLoadCallback(drawBasic);

	function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Ikä');
      data.addColumn('number', 'Määrä');

      data.addRows([
        ["0-3v", 5],
        ["4-6v", 2],
        ["7-10v", 13],
        ["11-15v", 4],
        ["15-18v", 5],
      ]);

      var options = {
        title: 'Ikäjakauma',
        hAxis: {
          title: 'Ikäjakauma',
          format: 'string',
        },
        vAxis: {
          title: 'Lukumäärä'
        }
      };
	  
	  var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_div'));

      chart.draw(data, options);
    }
	*/
