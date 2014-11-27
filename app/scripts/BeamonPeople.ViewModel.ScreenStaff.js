var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing staff analysis
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenStaffViewModel = function(params) {
  'use strict';

  this.title = 'Beamon People Tidslinje';

  /** @type {KnockoutObservable} */
  this.items = ko.observableArray([]);

  //var rand = _.sample(params.o.elements.length);

  // set data from injected object
  this.items(params.o.elements);

};