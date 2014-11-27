var BeamonPeople = BeamonPeople || {};
BeamonPeople.Services = BeamonPeople.Services || {};

/**
 * Configuration for Screens ViewModel
 */
BeamonPeople.CachedAPICall = function(api, _options, _callback) {
  'use strict';

  var self = this;

  this.key            = 'BeamonPeopleScreen:' + api;
  this.now            = new Date().getTime();
  this.refreshTimeout = 15 * (60 * 1000);
  this.timestamp      = storage.getItem( this.key + ':timestamp' );  // get timestamp from local storage
  this.refresh        = storage.getItem( this.key + ':forceRefresh' ) || false; // read forceRefresh from local storage
  
  this._checkVersionChanged = function() {
    //get
    var storedVersion = storage.getItem( this.key + ':version' );
    // set
    storage.setItem( self.key + ':version', BeamonPeople.Config.appVersion );

    self.refresh = (BeamonPeople.Config.appVersion !== storedVersion);

    return (BeamonPeople.Config.appVersion !== storedVersion);
  };

  this._GoogleSpreadsheet = function() {
    self._checkVersionChanged();

    if( self.refresh || !self.timestamp || ((self.now - self.timestamp) > self.refreshTimeout) ) {
      if(BeamonPeople.Config.verbose) { console.log( 'Refreshing...' ); }
      storage.removeItem( self.key + ':forceRefresh' ); // reset the forceRefresh if exists before

      Tabletop.init({ 
        debug:    false,
        key:      _options.gsKey || BeamonPeople.Services.Keys.googleSpreadsheet,
        //wanted:   ((_options.gsSheet) ? [_options.gsSheet] : []),
        callback: function() {
          storage.setItem( self.key, JSON.stringify( arguments ) ); // store resp in local storage

          storage.setItem( self.key + ':timestamp', self.now );

          _callback.apply(self, arguments);
        }
      });

    } else {
      if(BeamonPeople.Config.verbose) { console.log( 'Refreshing in', Math.round( ( ( self.refreshTimeout - (self.now - self.timestamp) ) / 1000 ), 1 ), 'seconds.' ); }
      var storedArguments = _.values(JSON.parse( storage.getItem( self.key ) )); // provide data from local storage instead of a network call

      // simulate a normal async network call
      setTimeout( function() {
        _callback.apply(self, storedArguments);
      }, 0);     
    }

  };

  /** call if api is defined */
  if(_.isFunction(self[ '_' + api ])) {
    self[ '_' + api ]();
  }

};

/**
 * Helper method to use Tabletop for accessing a published Google Spreadsheet
 * @param {String} gsKey The key to acess the published Google Spreadsheet
 * @param {String} gsSheet The name of the worksheet inside the Google Spreadsheet - null to fetch all
 * @param {Function} gsCallback The function used to do stuff with the data returned from Google Spreadsheet
 */
BeamonPeople.Services.GSApi = function(options, gsCallback) {
  'use strict';

  options = _.isObject(options) ? options : {}; 
  BeamonPeople.CachedAPICall('GoogleSpreadsheet', options, gsCallback);
};

/**
 * Helper method to use Instafeed for fetching tag-based instagram pictures
 * @param {String} igId 
 * @param {String} igOptions 
 * @param {Function} igCallback
 */
BeamonPeople.Services.IGApi = function(igId, igOptions, igCallback) {
  'use strict';

  var feed = new Instafeed({
    get: 'tagged',
    tagName: igOptions.tagName || 'beamonpeople',
    clientId: igId || BeamonPeople.Services.Keys.instagram, 
    mock: true,
    success: igCallback, 
    resolution: igOptions.resolution || 'standard_resolution',
    limit: igOptions.limit || 1,
    sortBy: igOptions.sortBy || 'random'
  });
  feed.run();
};