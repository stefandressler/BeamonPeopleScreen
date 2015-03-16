var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing consultant profile
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenConsultprofileViewModel = function(params) {
  'use strict';

  this.title = 'Veckans konsultprofil v' + BeamonPeople.Utils.GetCurrentWeek(new Date());

  /** @type {KnockoutObservable} */
  this.items = ko.observableArray([]);

  /** @type {KnockoutObservable} */
  this.consult = ko.observable(params.o.elements[0].consultname);

  /** @type {KnockoutObservable} */
  this.image = ko.observable(params.o.elements[0].image);

  /** @type {KnockoutObservable} */
  this.roles = ko.observable(_.compact(_.map(params.o.elements, function(consult) {return consult.roles;})).join(', '));

  /** @type {KnockoutObservable} */
  this.tags = ko.observableArray(_.compact(_.map(params.o.elements, function(consult) {return consult.tags;})));

  /** questions and answers list */
  this._qa = [];

  this.addToQA = function(elementCell) {
    var _item = _.compact(_.map(params.o.elements, function(consult) {return consult[elementCell];})) || [];

    if(_item.length > 0) {
      this._qa.push(_.object(['question', 'answer'], _item));
    }
  };

  this.addToQA('qa1');
  this.addToQA('qa2');
  this.addToQA('qa3');
  this.addToQA('qa4');

  /** @type {KnockoutObservable} */
  this.qa = ko.observable(_.sample(this._qa)); // randomize

};
