var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing planned activities
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenActivitiesViewModel = function(params) {
  'use strict';

  var self = this;

  this.title = 'Aktiviteter';
  
  /** @type {KnockoutObservable} */
  this.items = ko.observableArray([]);

  /**
   * Helper method to return an array containing the ranking for the given items
   * @param {Array} items
   */
  this._returnItemRanking = function(items) {
    items = items || [];
    return _.map(items, function(e) { return (e.yes || 0); });
  };

  /**
   * Inject ranking based parameters, e.g. fontSize, fontWeight
   * @param {Object} o
   */
  this.injectMeta = function(o) {
    return _.map(o, function(e) {
      return { 
        yes: e.yes, 
        activity: e.activity, 
        fontsize: BeamonPeople.Utils.intervalicValueMap(self.intervalItemRange, self.intervalFontSize, (e.yes || 0)), 
        fontweight: BeamonPeople.Utils.intervalicValueMap(self.intervalItemRange, self.intervalFontWeight, (e.yes || 0)), 
        opacity: (BeamonPeople.Utils.intervalicValueMap(self.intervalItemRange, self.intervalOpacity, (e.yes || 0)) / 10) 
      };
    });
  };

  /** min/max font-size for items shown based on their ranking */
  this.intervalFontSize = [1, 5];

  /** min/max font-weight for items shown based on their ranking */
  this.intervalFontWeight = [100, 700];

  /** min/max opacity for items shown based on their ranking - will be divided by 10 later on */
  this.intervalOpacity = [4, 10];

  /** array with all rankings */
  this.intervalItems = this._returnItemRanking(params.o.elements);

  /** the min och max values of the rankings */
  this.intervalItemRange = [_.min(this.intervalItems), _.max(this.intervalItems)];

  
  /** Fill items with data from injected object */
  this.items(this.injectMeta(params.o.elements));
};
