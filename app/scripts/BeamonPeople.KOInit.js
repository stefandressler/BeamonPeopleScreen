/**
 * Custom names for KO.Components with Configs - if defined
 */
var namingConventionLoader = {
  getConfig: function(name, callback) {
    'use strict';

    // is it needed to register the specific components?
    
    if( !ko.components.isRegistered(name) ) {
      ko.components.register(name, {});
      if(BeamonPeople.Config.verbose) { console.log('Registering ko.component "%s".', name); }
    }

    var templateConfig = { element: name + '-template' };

    var viewModelConfig = {
      createViewModel: function(params, componentInfo) {
        var config = {};
        var configId = $(componentInfo.element).data('config') || null;
        if(configId) {
          var ConfigIdModel = BeamonPeople[BeamonPeople.Utils.toPascalCase(configId) + 'JsConfig'];
          if(_.isFunction(ConfigIdModel)) {
              config = new ConfigIdModel();
          }
        }

        // Return the desired view model instance, e.g.:
        return new BeamonPeople[BeamonPeople.Utils.toPascalCase(name) + 'ViewModel'](params, config);
      }
    };

    callback({ viewModel: viewModelConfig, template: templateConfig });
  }
};

/** Register it. Make it take priority over the default loader. */
ko.components.loaders.unshift(namingConventionLoader);