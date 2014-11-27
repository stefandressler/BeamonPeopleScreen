var APP_BANNER; // automatically replaced when grunted with data from package.json

/*
 * Namespace
 **/
var BeamonPeople = BeamonPeople || {};
BeamonPeople.Config = {};

/*
 * Settings
 **/
BeamonPeople.Config.appVersion = 'APP_VERSION'; // automatically replaced when grunted with data from package.json

BeamonPeople.Config.appName = 'APP_NAME'; // automatically replaced when grunted with data from package.json

BeamonPeople.Config.verbose = false;

/** force reload after 12h to "autoupdate" code */
setTimeout(function() { window.location.reload(); }, (720 * (60 * 1000)));

/*
 * write some info about the app to the console
 **/
if(BeamonPeople.Config.verbose) { 
  console.log( 'Application "%s", v%s has started.', BeamonPeople.Config.appName, BeamonPeople.Config.appVersion);
}