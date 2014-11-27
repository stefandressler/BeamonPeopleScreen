var BeamonPeople = BeamonPeople || {};

/**
 * Screen ViewModel showing instagram pictures
 * @param {Object} params 
 * @param {Object} config Optional
 */
BeamonPeople.ScreenInstagramViewModel = function(params) {
  'use strict';

  var self = this;

  /** @type {KnockoutObservable} */
  this.singleRandom = ko.observable();

  /** @type {KnockoutObservable} */
  this.caption = ko.observable();

  /** @type {KnockoutObservable} */
  this.tags = ko.observableArray([]);
  
  // set data from injected object
  this.el = params.o.elements[0];

  this.tagName = this.el.tagname;

  this.resolution = this.el.resolution;

  this.limit = this.el.limit;

  this.sortBy = this.el.sortby;

  this.igOptions = { 
    tagName: this.tagName, 
    resolution: this.resolution, 
    limit: this.limit, 
    sortBy: this.sortBy
  };

  this.igCallback = function(data) {
    if(data.meta.code === 200) {
      var img = _.sample(data.data);

      self.singleRandom('<img src="'+img.images.standard_resolution.url+'" />');
      self.caption(img.caption.text);
      self.tags(img.tags);
    }
  };

  /** start instantiating */
  BeamonPeople.Services.IGApi(null, this.igOptions, this.igCallback);

};
