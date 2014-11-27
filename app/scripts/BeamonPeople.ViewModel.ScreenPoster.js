var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing stuff about Management conference
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenPosterViewModel = function(params) {
  'use strict';

  this.title = 'Veckans Löpsedel';

  /** @type {KnockoutObservable} */
  this.items = ko.observableArray([]);

  // set data from injected object
  this.items(params.o.elements);
};
