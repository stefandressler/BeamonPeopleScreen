var BeamonPeople = BeamonPeople || {};
BeamonPeople.Utils = {};

/**
 * Splits an array into parts with "chunkSize" values
 * @param {Array} arr
 * @param {Number} chunkSize
 */
BeamonPeople.Utils.chunk = function(arr, chunkSize) {
  'use strict';

  var R = [];
  for (var i=0,len=arr.length; i<len; i+=chunkSize) {
    R.push(arr.slice(i,i+chunkSize));
  }
  return R;
};

/**
 * 
 * @param {Array} intervalA 
 * @param {Array} intervalB
 * @param {_} valueIntervalA
 */
BeamonPeople.Utils.intervalicValueMap = function(intervalA, intervalB, valueIntervalA) {
  'use strict';

  var valueIntervalB = (valueIntervalA - intervalA[0]) * (intervalB[1] - intervalB[0]) / (intervalA[1] - intervalA[0]) + intervalB[0];
  valueIntervalB = Math.round(valueIntervalB); // Ommit rounding if not needed.
  return valueIntervalB;
};

/**
 * Formats a string with dashes into a camel-cased one, e.g. screen-people -> ScreenPeople
 * @param {String} daherized 
 */
BeamonPeople.Utils.toPascalCase = function(dasherized) {
  'use strict';

  return dasherized.replace(/(^|-)([a-z])/g, function (g, m1, m2) { return m2.toUpperCase(); });
};