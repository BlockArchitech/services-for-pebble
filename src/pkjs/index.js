require('pebblejs');
var UI = require('pebblejs/ui');
var ajax = require('ajax')
//clay
var Settings = require('pebblejs/settings');
var Clay = require('pebble-clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig, null, {autoHandleEvents: false});

Pebble.addEventListener('showConfiguration', function(e) {
  settings = JSON.parse(localStorage.getItem('clay-settings')) || {};
  console.log('CURRENT SETTINGS: ' + JSON.stringify(settings));
  Pebble.openURL(clay.generateUrl());
});

Pebble.addEventListener('webviewclosed', function(e) {
  if (e && !e.response) {
    return;
  }
  var dict = clay.getSettings(e.response);
  settings = JSON.parse(localStorage.getItem('clay-settings')) || {};
  console.log('NEW SETTINGS: ' + JSON.stringify(settings));
  Settings.option(dict);
});

// Returns undefined. Only for testing.
//var claytest = Settings.option('test1');


// Get list of services you are in via planning center services API
// https://api.planningcenteronline.com/services/v2/people/(User ID) URL for this, so we'd replace user ID with our own (e.g. 123456)
// https://api.planningcenteronline.com/services/v2/people/(userID)/schedules is whr








// Initialization Code
Pebble.addEventListener("ready",
  function(e) {
	// Credit goes to swansswansswansswanssosoft for this line
	settings = JSON.parse(localStorage.getItem('clay-settings')) || {};
	// App started, log to console
	console.log('Services v0.1')
    
	// Create our main UI card
	var mainUI = new UI.Card({
		title: 'Services',
		body: 'Developer Menu: UP for config vars DOWN for JSON',
		scrollable: false
	  });
	// Show Main UI card
	mainUI.show();
	$.ajax({ url: `https://api.planningcenteronline.com/services/v2/people/${settings.userId}/schedules`, type: 'json' , headers: { 'Authorization': `Basic ${settings.appId}:${settings.accessToken}` }},
	function(data) {
	  console.log('Quote of the day is: ' + data.contents.data[0].attributes.dates);
	}
  );
    // If someone clicks 'up', show our menu with (currently) just our config vars
	mainUI.on('click', 'up', function(e) {
		var menu = new UI.Menu({
		  sections: [{
			items: [{
				// App Token 
			  title: 'AppToken',
			  subtitle: `${settings.appToken}`,
			}, {
				// User ID
			  title: 'UserID',
			  subtitle: `${settings.userId}`,
			}, {
				// App ID - these are all done via clay, see config.json and package.json for messageKeys
			  title: 'AppID',
			  subtitle: `${settings.appId}`,
			}]
		  }]
		});
		// If someone clicks select, send a message to console. This is just for testing, hence why it's commented out. Uncomment if you're unsure if the app is responding.
		//menu.on('select', function(e) {
		  //console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
		  //console.log('The item is titled "' + e.item.title + '"');
		//});
		menu.show();
	  });
	  // If someone clicks select, it'll show this - this will be deleted soon in favor of services
	  mainUI.on('click', 'select', function(e) {
		  var testConfig = new UI.Card({
			  title: 'Config Data',
			  body: `${settings}`,
			  scrollable: true
		  });
		  // show the card
		  testConfig.show();
		});
		// Whitespace for future use

	  }
	
);
// End of ready - post-initalization code, for other code to run it'll be down here