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
 * @param {String} dasherized 
 */
BeamonPeople.Utils.toPascalCase = function(dasherized) {
  'use strict';

  return dasherized.replace(/(^|-)([a-z])/g, function (g, m1, m2) { return m2.toUpperCase(); });
};

/**
 * Gets the current week number
 * @param {Date} d 
 */
 BeamonPeople.Utils.GetCurrentWeek = function(d) { 
 
  // Create a copy of this date object  
  var target  = new Date(d.valueOf());  
  
  // ISO week date weeks start on monday  
  // so correct the day number  
  var dayNr   = (d.getDay() + 6) % 7;  
 
  // Set the target to the thursday of this week so the  
  // target date is in the right year  
  target.setDate(target.getDate() - dayNr + 3);  
 
  // ISO 8601 states that week 1 is the week  
  // with january 4th in it  
  var jan4    = new Date(target.getFullYear(), 0, 4);  
 
  // Number of days between target date and january 4th  
  var dayDiff = (target - jan4) / 86400000;    
 
  // Calculate week number: Week 1 (january 4th) plus the    
  // number of weeks between target date and january 4th    
  var weekNr = 1 + Math.ceil(dayDiff / 7);    
 
  return weekNr;    
 
};