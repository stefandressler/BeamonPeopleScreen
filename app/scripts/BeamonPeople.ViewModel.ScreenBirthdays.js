var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing the birtdays of Beamon People
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenBirthdaysViewModel = function(params) {
  'use strict';

  var self = this;

  this.title = 'Födelsedagar';

  this.today = moment().format('MM-DD');

  this._lastSlogan = '';

  this.slogans = [
    'Grattis på födelsedagen',
    'Stort grattis',
    'Gratulationer till dig',
    'Hurra hurra', 
    'Grattis'
  ];

  this._getRandomSlogan = function() {
    var rand = _.sample(_.without(self.slogans, self._lastSlogan));
    self._lastSlogan = rand;

    return rand;
  };

  this.todaysBirthdays = _.compact(_.map(params.o.elements, function(consult) { if(consult.birthday === self.today) { return [self._getRandomSlogan(), consult.people.trim()]; } }));

  /** @type {KnockoutObservable} */
  this.birthdays = ko.observable(this.todaysBirthdays);

};