var BeamonPeople = BeamonPeople || {};

// http://stackoverflow.com/questions/9339865/get-the-hashchange-event-to-work-in-all-browsers-including-ie7
// Usage, infinitely many times:
// addHashChange(function(e){/*console.log(e.newURL||location.href);*/location.reload()});


/**
 * Configuration for Screens ViewModel
 */
BeamonPeople.HashMapper = function() {
  'use strict';

  var self = this;

  this._hashPrefix = '#!/';

  // regexps
  this._removeHashPrefix = /^\#\!\//;

  /**
  * Split the hash on slash and returns a string
  * @param {String} hash
  */
  this._hashToArray = function(hash) {
    return hash.split('/');
  };

  /**
  * Joins a array with slash and returns it
  * @param {Array} hashArray
  */
  this._arrayToHash = function(hashArray) {
    return hashArray.join('/');
  };

  /**
  * Replace unvalid chars in hash url
  * @param {String} hash
  */
  this._cleanHash = function (hash) {

      // first clean all whitespaces
      hash = hash.replace(/\s+/g, '');

      // then clean all extra slashes
      hash = hash.replace(/\/+/g, '/');

      // remove first slash
      hash = hash.replace(/^\//g, '');

      // remove trailing slash
      hash = hash.replace(/\/$/g, '');
      
      return hash;
  };

  /**
  * Decode hashArray into an array and return it.
  * @param {Array} hashArray
  */
  this._decodeHashArray = function(hashArray) {
      var decodedHashArray = [];
      _.each(hashArray, function (part) {
          decodedHashArray.push(
              decodeURIComponent(part)
          );
      });
      return decodedHashArray;
  };

  this.hashToScreen = function(hash) {

    hash = hash || window.location.hash;

    // first remove hash prefix
    // TODO: space to %20
    hash = self._cleanHash(hash);

    hash = hash.replace(self._removeHashPrefix, '');

    var hashParts = self._decodeHashArray(self._hashToArray(hash));

    return hashParts[0];
  };


  this.hashChangeFuncs = [];

  this.oldHref = location.href;

  window.addHashChange = function(func, before) {
    if(typeof func === 'function') {
      self.hashChangeFuncs[before?'unshift':'push'](func);
    }
  };

  window.removeHashChange = function(func) {
    for(var i=self.hashChangeFuncs.length-1; i>=0; i--) {
      if(self.hashChangeFuncs[i] === func) {
        self.hashChangeFuncs.splice(i, 1);
      }
    }
  };

  if('onhashchange' in window) {
    if(window.addEventListener) {
      window.addHashChange = function(func, before) {
        window.addEventListener('hashchange', func, before);
      };
      window.removeHashChange = function(func) {
        window.removeEventListener('hashchange', func);
      };
      return;
    } else if (window.attachEvent) {
      window.addHashChange = function(func) {
        window.attachEvent('onhashchange', func);
      };
      window.removeHashChange = function(func) {
        window.detachEvent('onhashchange', func);
      };
      return;
    }
  }
  
  setInterval(function() {
    var newHref = location.href;
    if(self.oldHref !== newHref) {
      var _oldHref = self.oldHref;
      self.oldHref = newHref;
      for(var i=0; i<self.hashChangeFuncs.length; i++) {
        self.hashChangeFuncs[i].call(window, {
          'type': 'hashchange',
          'newURL': newHref,
          'oldURL': _oldHref
        });
      }
    }
  }, 100);


  return {
    hashToScreen: this.hashToScreen
  };

};


/** start instantiating */
BeamonPeople.HashMapperInstance = new BeamonPeople.HashMapper();