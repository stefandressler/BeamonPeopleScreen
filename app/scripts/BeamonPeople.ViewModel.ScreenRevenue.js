var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing the revenue
 * @param {Object} params 
 * @param {Object} config
 */
BeamonPeople.ScreenRevenueViewModel = function(params) {
  'use strict';

  this.title = 'Omsättning';

  this.gsKey = params.key;

  this.gsSheet = params.sheet;

  this.items = ko.observableArray([]);

  // set data from injected object
  this.items(params.o.elements);

  var m = [];
  var r = [];
  var p = [];
  _.each(params.o.elements, function(el) {
    m.push(el.date);
    r.push(el.revenue);
    p.push(el.people);
  });

  // Get context with jQuery - using jQuery's .get() method.
  var ctxR = $('#myChartR').get(0).getContext('2d');
  //var ctxP = $("#myChartP").get(0).getContext("2d");
  // This will get the first returned node in the jQuery collection.

  Chart.defaults.global.responsive = true;
  Chart.defaults.global.maintainAspectRatio = true;
  Chart.defaults.global.scaleLineColor = 'rgba(0,0,0,.3)';
  Chart.defaults.global.scaleFontColor = 'rgba(0,0,0,.3)';
  Chart.defaults.global.scaleFontSize = 10;
  Chart.defaults.global.scaleFontStyle = 'bold';

  Chart.defaults.global.scaleOverride = true;
  Chart.defaults.global.scaleSteps = 6;
  Chart.defaults.global.scaleStepWidth = 1000;
  Chart.defaults.global.scaleStartValue = 0;

  var rChunks = BeamonPeople.Utils.chunk(r, 12);

  var options = {
    showTooltips: false,
    datasetStrokeWidth : 2,
    pointDot : false
  };
  var dataR = {
      labels: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
      datasets: [
          {
            label: '2010',
            fillColor: 'rgba(20,20,20,0.2)',
            strokeColor: 'rgba(20,20,20,0.2)',
            data: rChunks[0]
          },
          {
            label: '2011',
            fillColor: 'rgba(50,50,50,0.2)',
            strokeColor: 'rgba(50,50,50,0.2)',
            data: rChunks[1]
          },
          {
            label: '2012',
            fillColor: 'rgba(80,80,80,0.2)',
            strokeColor: 'rgba(80,80,80,0.2)',
            data: rChunks[2]
          },
          {
            label: '2013',
            fillColor: 'rgba(110,110,110,0.2)',
            strokeColor: 'rgba(110,110,110,0.2)',
            data: rChunks[3]
          },
          {
            label: '2014',
            fillColor: 'rgba(151,187,205,0.3)',
            strokeColor: 'rgba(151,187,205,1)',
            data: rChunks[4]
          }
      ]
  };
  new Chart(ctxR).Line(dataR, options);

  //this.legend = ko.observable(myLineChart.generateLegend());

};
