var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing some analysis/statistics
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenStatisticsViewModel = function(params) {
  'use strict';

  this.title = 'Statistik';

  /** @type {KnockoutObservable} */
  this.items = ko.observableArray([]);

  // set data from injected object
  this.items(params.o.elements);

};