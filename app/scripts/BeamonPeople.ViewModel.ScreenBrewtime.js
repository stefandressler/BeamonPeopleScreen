var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing 
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenBrewtimeViewModel = function(params) {
  'use strict';

  var self = this;

  this.title = 'BrewTime';

  this.brewDiff = ko.observable();

  this.brewTimestamp = ko.observable();

  var bodyClasses = [];
  $.getJSON( 'http://beamon-people-brew-time.herokuapp.com/api' ).then(
    function( o ) {   // onSuccess
      bodyClasses.push( o.heatmap );
      if( o.empty ) { bodyClasses.push( 'empty' ); }
      if( o.isBeamonOffice ) { bodyClasses.push( 'is-beamon' ); }
      $('body').removeClass('hot medium cold empty is-beamon').addClass( bodyClasses.join( ' ' ) );
      // var color;
      // if (o.heatmap.indexOf('hot') !== -1) {
      //   color = '#d9392d';
      // } else if (o.heatmap.indexOf('medium') !== -1) {
      //   color = '#ffcc00';
      // } else if (o.heatmap.indexOf('cold') !== -1) {
      //   color = '#2d72d9';
      // } else {
      //   color = 'green';
      // }

      self.brewDiff(o.diff);
      self.brewTimestamp(o.timestamp);
    },
    function( o, x, t ) {      // onFail
      bodyClasses.push( o.heatmap );
      if( o.isBeamonOffice ) { bodyClasses.push( 'is-beamon' ); }
      $('body').removeClass('hot medium cold empty is-beamon').addClass( 'empty ' + bodyClasses.join( ' ' ) );
    },
    function() {      // onProgress
    }
  );


};