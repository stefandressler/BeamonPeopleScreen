var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing stuff about Management conference
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenManagementconferenceViewModel = function(params) {
  'use strict';

  this.title = 'Ledningskonferens';

  /** @type {KnockoutObservable} */
  this.items = ko.observableArray([]);

  var el = [];
  el = _.filter(params.o.elements, function(e) { 
    return e.status === 'Klar'; 
  });

  // set data from injected object
  this.items(el);
};
