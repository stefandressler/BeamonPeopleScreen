var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing staff count
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenPeopleViewModel = function(params) {
  'use strict';

  this.title = 'Beamon People Nu';

  this.gsKey = params.key;

  this.gsSheet = params.sheet;

  /** @type {KnockoutObservable} */
  this.quantity = ko.observable();

  // set data from injected object
  this.quantity(params.o.elements[0].people);
};