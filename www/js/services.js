angular.module('starter.services', [])

.factory('charts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  //var charts = [{
  //  id: 0,
  //  name: 'DEPTH',
  //  lastText: 'You on your way?',
  //  data: [7377.5000, 7377.7500, 7378.0000, 7378.2500, 7378.5000]
  //}, {
  //  id: 1,
  //  name: 'TCDX',
  //  lastText: 'Hey, it\'s me',
  //  data: [131.1000, 131.1000, 131.1000, 131.1000, 131.1000]
  //}, {
  //  id: 2,
  //  name: 'TVD',
  //  lastText: 'I should buy a boat',
  //  data: [0.0000, 2.5000, 5.0000, 7.5000, 10.0000]
  //}, {
  //  id: 3,
  //  name: 'GR1AX',
  //  lastText: 'Look at my mukluks!',
  //  face: [29.6793, 29.4022, 29.1251, 28.8480, 28.5709]
  //}, {
  //  id: 4,
  //  name: 'GR1CX',
  //  lastText: 'This is wicked good ice cream.',
  //  face: [36.9189, 36.5742, 36.2295, 35.8848, 35.5401]
  //}, {
  //  id: 5,
  //  name: 'RACHX',
  //  lastText: 'This is wicked good ice cream.',
  //  face: [0.2084, 0.2096, 0.2107, 0.2077, 0.2011]
  //}, {
  //  id: 6,
  //  name: 'RACLX',
  //  lastText: 'This is wicked good ice cream.',
  //  face: [0.1037, 0.1037, 0.1037, 0.1037, 0.1037]
  //}, {
  //  id: 7,
  //  name: 'RPCHX',
  //  lastText: 'This is wicked good ice cream.',
  //  face: [97543.3984, 97543.3984, 97543.3984, 97543.3984, 136.9770]
  //}, {
  //  id: 8,
  //  name: 'RPCLX',
  //  lastText: 'This is wicked good ice cream.',
  //  face: [97133.5000, 48683.0445, 232.5890, 97133.5000, 210.7840]
  //}];
  var charts = {};
  //var axis = ['DEPTH', 'TCDX', 'ROP_AVG', 'TVD', 'GR1AX','GR1CX', 'RACHX', 'RACLX', 'RPCHX', 'RPCLX'];
  //var axisData = {
  //  'DEPTH': [7377.5000, 7377.7500, 7378.0000, 7378.2500, 7378.5000],
  //  'TCDX' :[131.1000, 131.1000, 131.1000, 131.1000, 131.1000],
  //  'ROP_AVG': [0.0000, 2.5000, 5.0000, 7.5000, 10.0000],
  //  'TVD' : [7650.9100, 7651.1600, 7651.4100, 7651.6600, 7651.9100],
  //  'GR1AX' : [29.6793, 29.4022, 29.1251, 28.8480, 28.5709],
  //  'GR1CX' : [36.9189, 36.5742, 36.2295, 35.8848, 35.5401],
  //  'RACHX' : [0.2084, 0.2096, 0.2107, 0.2077, 0.2011],
  //  'RACLX' : [0.1037, 0.1037, 0.1037, 0.1037, 0.1037],
  //  'RPCHX' : [97543.3984, 97543.3984, 97543.3984, 97543.3984, 136.9770],
  //  'RPCLX' : [97133.5000, 48683.0445, 232.5890, 97133.5000, 210.7840]
  //};
  return {
    all: function() {
      return charts;
    },
    getAxis: function() {
      return charts.curveInfo.curveArray;
    },
    getXAxisData: function() {
      return charts.curveData[charts.curveInfo.curveArray[0]];
    },
    getAxisData: function(key) {
      //return axisData[key];
      return charts.curveData[key];
    },
    remove: function(chart) {
      charts.splice(charts.indexOf(chart), 1);
    },
    get: function(chartId) {
      //for (var i = 0; i < charts.length; i++) {
      //  if (charts[i].id === parseInt(chartId)) {
      //    return charts[i];
      //  }
      //}
      //return null;
      return charts;
    },
    set: function(chartData) {
      charts = chartData;
    }
  };
});
