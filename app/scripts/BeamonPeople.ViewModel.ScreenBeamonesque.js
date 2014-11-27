var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing "mindmap" with Beamonesque-definitions
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenBeamonesqueViewModel = function(params) {
  'use strict';

  var self = this;

  this.title = 'Beamonesque';

  this.items = params.o.elements || [];

  /**
   * Configure and show Google WordTreeChart
   */
  this.drawChart = function() {

    var data = new google.visualization.DataTable();

    data.addColumn('string', 'childLabel');
    data.addColumn('number', 'weight');
    data.addColumn('string', 'color');

    _.each(self.items, function(item) {
      data.addRow(['Beamonesque ' + item.phrase, 1, 'white']);
    });

    var options = {
      wordtree: {
        format: 'implicit',
        word: 'Beamonesque'
      }
    };

    setTimeout(function() {
      var chart = new google.visualization.WordTree(document.getElementById('chart_beamonesque'));
      chart.draw(data, options);
    }, 200);

  };


  /** start instantiating */
  this.drawChart();

};