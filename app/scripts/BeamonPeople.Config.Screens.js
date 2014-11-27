var BeamonPeople = BeamonPeople || {};

/**
 * Configuration for Screens ViewModel
 */
BeamonPeople.ScreensJsConfig = function() {
  'use strict';

  //this.hashMapper = new BeamonPeople.HashMapper();
  this.hashMapper = BeamonPeople.HashMapperInstance || new BeamonPeople.HashMapper();

  this.screenFromHash = this.hashMapper.hashToScreen() || null;

  // load random screen on page load
  this.populateOnPageLoad = true;

  // should the worksheets be randomized
  this.randomizeWorksheets = false;

  // reload by given timeout
  this.autoReloadWorksheets = true;

  // timeout when autoReload is set
  this.autoReloadWorksheetsTimeout = 30000;

  // just show specific worksheet?
  this.limitToWorksheet = this.screenFromHash || null; // null || string

  // timeout when autoReload is set
  this.injectWorksheets = [
    { modelName: 'brewtime', model: {} }
  ];

  // possible background color CSS classes
  this.backgroundColors = ['blue','lila','orange','green','grey'];

  if(BeamonPeople.Config.verbose) {
    console.group('Config');
      console.log('screenFromHash', this.screenFromHash);
      console.log('populateOnPageLoad', this.populateOnPageLoad);
      console.log('autoReloadWorksheets', this.autoReloadWorksheets);
      console.log('autoReloadWorksheetsTimeout', this.autoReloadWorksheetsTimeout);
      console.log('limitToWorksheet', this.limitToWorksheet);
    console.groupEnd();
  }

  return this;
};
