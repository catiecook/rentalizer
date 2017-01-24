google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2013',  1000,      400],
    ['2014',  1170,      460],
    ['2015',  660,       1120],
    ['2016',  1030,      540]
  ]);

  var options = {
    title: 'Company Performance',
    hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('monthly'));
  chart.draw(data, options);

  var data2 = google.visualization.arrayToDataTable([
    ['Diameter', 'Age'],
    [8, 37], [4, 19.5], [11, 52], [4, 22], [3, 16.5], [6.5, 32.8], [14, 72]]);

  var options2 = {
    title: 'Age of sugar maples vs. trunk diameter, in inches',
    hAxis: {title: 'Diameter'},
    vAxis: {title: 'Age'},
    legend: 'none',
    trendlines: { 0: {} }    // Draw a trendline for data series 0.
  };

  var chart2 = new google.visualization.ScatterChart(document.getElementById('daily'));
  chart2.draw(data2, options2);

};
