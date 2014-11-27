var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing a Google Map
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenMissionmapViewModel = function(params) {
  'use strict';

  var self = this;

  this.title = 'Uppdragskarta';

  this.items = params.o.elements || [];

  /**
   * Configure and show Google Map
   */
  this.drawMap = function() {

    var geoRows = [];
    _.each(self.items, function(item) {
      geoRows.push({c:[{v: item.lat}, {v: item.long}, {v: item.name}]});
    });

    var data = new google.visualization.DataTable( {
      cols: [
        {id: 'lat', label: 'Latitude', type: 'number'},
        {id: 'long', label: 'Longitude', type: 'number'},
        {id: 'name', label: 'Longitude', type: 'string'}
      ],
      rows: geoRows
    });

    var options = { 
      showTip: true, 
      mapType: 'normal'
    };

    setTimeout(function() {
      var map = new google.visualization.Map(document.getElementById('chart_missionmap'));
      map.draw(data, options);
    }, 200);

  };

  /** start instantiating */
  this.drawMap();

};