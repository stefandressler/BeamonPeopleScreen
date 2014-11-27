var BeamonPeople = BeamonPeople || {};

/**
 * Screens ViewModel - wrapper for the different Screen-ViewModels
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreensViewModel = function(params, config) {
  'use strict';
  /*
  // Make sure Viewmodel is being used as a constructor no matter what.
  //  - not needed right now
  if(!this || !(this instanceof BeamonPeople.ScreensViewModel)) {
    console.log('not an object');
    //return new BeamonPeople.ScreensViewModel = function(params, config);
  }
  */

  var self = this;

  this._worksheetDoesNotExist = 'does-not-exist';

  this._lastActiveWorksheet = null;

  this._lastRandBackgroundColor = null;

  /** @type {KnockoutObservable} */
  this.backgroundColors = ko.observable(config.backgroundColors);

  /** @type {KnockoutObservable} */
  this.backgroundColor = ko.observable(null);

  this.reloadInterval = null; // the setInterval function wrapper

  /** @type {KnockoutObservable} */
  this.worksheets = ko.observableArray([]);

  /** @type {KnockoutObservable} */
  this.worksheetName = ko.observable();

  /** @type {KnockoutObservable} */
  this.worksheetData = ko.observable();

  /** @type {KnockoutObservable} */
  this.isLoading = ko.observable(false);

  /** @type {KnockoutObservable} */
  this.loadingMessage = ko.observable('...');

  /** @type {KnockoutObservable} */
  this.randomizeWorksheets = ko.observable(config.randomizeWorksheets);

  /** @type {KnockoutObservable} */
  this.populateOnPageLoad = ko.observable(config.populateOnPageLoad);

  /** @type {KnockoutObservable} */
  this.autoReloadWorksheets = ko.observable(false);

  this.autoReloadWorksheetsTimeout = config.autoReloadWorksheetsTimeout;

  this.autoReloadWorksheets.subscribe(function(val) {
    if(val) {
      self.reloadInterval = setInterval(function() { 
        self.loadWorksheets();
      }, self.autoReloadWorksheetsTimeout);
    } else {
      window.clearInterval(self.reloadInterval);
    }
  });

  /** @type {KnockoutObservable} */
  this.autoReloadWorksheets(config.autoReloadWorksheets);

  /** @type {KnockoutObservable} */
  this.limitToWorksheet = ko.observable(config.limitToWorksheet);

  this.limitToWorksheet.subscribe(function(worksheet) {
    BeamonPeople.Services.GSApi({ gsSheet: worksheet }, self.gsCallback);
  });

  /**
   * Helper method to remove all worksheets from ko. observable
   * @param {String} message The loading message to show
   * @param {Number} timeout The timeout to use for fading out the message
   */
  this._setTimeoutMessage = function(message, timeout) {
    self.loadingMessage(message);
    
    setTimeout(function() {
      self.loadingMessage('');
    }, timeout || 300);
    
  };

  this.backgroundColor.subscribe(function(backgroundClassName) {
    self.setBackgroundColor(backgroundClassName);
    //self._setTimeoutMessage(val || 'random');
  });

  /**
   * Helper method to remove all worksheets from ko. observable
   */
  this._clearWorksheets = function() {
    self.worksheets([]);
  };

  /**
   * Helper method to return a random worksheet of a given array
   * @param {Array} worksheets Worksheet names
   */
  this._getRandomWorksheet = function(worksheets) {
    var rand = _.sample(_.without(worksheets, self._lastActiveWorksheet));
    self._lastActiveWorksheet = rand;

    return rand;
  };

  /**
   * Helper method to return a random background color class
   */
  this._getRandomBackgroundColor = function() {
    var rand = _.sample(_.without(self.backgroundColors(), self._lastRandBackgroundColor));
    self._lastRandBackgroundColor = rand;

    return rand;
  };

  /**
   * Wrapper for getting the next worksheet - sequential
   * @param {Array} worksheets Worksheet names
   */
  this._getNextWorksheet = function(worksheets) {
    var lastIndex = _.indexOf(worksheets, (self._lastActiveWorksheet || worksheets[0]));
    var next = self._lastActiveWorksheet && worksheets[(lastIndex + 1)] || worksheets[0]; // take the first if no lastActive exists
    self._lastActiveWorksheet = next;

    return next;
  };

  /**
   * Wrapper for getting a worksheet - either random, sequential, one specific, ..
   * @param {Array} worksheetModelNames Worksheet names fetched from Google Spreadsheet
   */
  this._getWorksheet = function(worksheetModelNames) {
    worksheetModelNames = worksheetModelNames || [];
    
    var _worksheet = null;

    self.worksheets(worksheetModelNames);

    if(self.limitToWorksheet() && (_.indexOf(worksheetModelNames, self.limitToWorksheet()) === -1 )) {
      return self._worksheetDoesNotExist;
    }

    // limit to specific worksheet
    if(self.limitToWorksheet()) { //  && (_.indexOf(worksheetModelNames, self.limitToWorksheet()) !== -1 )
      _worksheet = self.limitToWorksheet();
    } else {

      // worksheet loop: randomized or seqiential
      if(self.randomizeWorksheets()) {
        _worksheet = self._getRandomWorksheet(worksheetModelNames);
      } else {
        _worksheet = self._getNextWorksheet(worksheetModelNames);
      }

    }

    // store as last active
    self._lastActiveWorksheet = _worksheet;

    return _worksheet || self._worksheetDoesNotExist;
  };

  /**
   * Sets the background color - randomize or given
   * @param {String} backgroundClassName Optional The given color class
   */
  this.setBackgroundColor = function(backgroundClassName) {
    backgroundClassName = backgroundClassName || self.backgroundColor();

    $('html').attr('class', ((backgroundClassName === null) ? self._getRandomBackgroundColor() : backgroundClassName));
  };

  /**
   * Callback when Google Spreadsheet returned some data
   * @param {Object} data
   * @param {Object} tabletop
   */
  this.gsCallback = function(data, tabletop) {
    self.isLoading(false);

    // inject Beamon People BrewTime (KaffeApp)
    _.each(config.injectWorksheets, function(injectWorksheet) {
      tabletop.model_names.push(injectWorksheet.modelName);
      tabletop.models.brewtime = injectWorksheet.model;
    });

    // fetch
    var _worksheet = self._getWorksheet(tabletop.model_names.sort());

    // apply
    self.worksheetName(_worksheet);
    self.worksheetData(tabletop.models[_worksheet]);

    self.setBackgroundColor();
  };

  this.loadWorksheets = function() {
    self.isLoading(true);
    BeamonPeople.Services.GSApi({}, self.gsCallback); 
  };


  /** start instantiating */
  if(this.populateOnPageLoad()) {
    self.loadWorksheets();
  }

  // apply listener for hash tag changes
  addHashChange(
    function() {
      self.limitToWorksheet((BeamonPeople.HashMapperInstance || new BeamonPeople.HashMapper()).hashToScreen(location.hash));
    }
  );

};
