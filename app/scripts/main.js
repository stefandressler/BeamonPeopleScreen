google.load('visualization', '1.1', { 'packages': ['map', 'wordtree'] });

document.ontouchmove = function(e) {e.preventDefault();}; // prevent from smooth-scrolling on iOS devices

/*
 * Check for local-storage
 * http://stackoverflow.com/questions/7750857/how-permanent-is-local-storage-on-android-and-ios
 **/
var storage,
    fail,
    uid;
try {
  uid = (new Date()).toString();
  (storage = window.localStorage).setItem(uid, uid);
  fail = storage.getItem(uid) !== uid;
  storage.removeItem(uid);
  //fail && ( storage = false );
  if( fail ) {
    storage = false;
  }
} catch(e) {}


(function ($, window, document, _, ko, undefined ) {
  $(function() {
    'use strict';

    /* initialize */
    ko.components.register('screens', {});
    
    ko.applyBindings();

  });
})(jQuery, window, document, _, ko);