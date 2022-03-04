require('pebblejs');
var UI = require('pebblejs/ui');

//clay
var Settings = require('pebblejs/settings');
var Clay = require('pebble-clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig, null, {autoHandleEvents: false});

Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL(clay.generateUrl());
});

Pebble.addEventListener('webviewclosed', function(e) {
  if (e && !e.response) {
    return;
  }
  var dict = clay.getSettings(e.response);
  
  // Save the Clay settings to the Settings module. 
  Settings.option(dict);
});

var claytest = Settings.option('test1');

// when system is ready, do this stuff
Pebble.addEventListener("ready",
  function(e) {
	// get clay settings and store it to our global settings variable so we can access it later
	// TODO: better logging for this
	// create a new ui card
	// maybe if we get this inside of the event listener then itll work?
    var card = new UI.Card({
	    title: 'Services',
	    body: 'Loading...',
	    scrollable: true
      });
	console.log('Loading Screen sent')
    // show the card
    card.show();
	console.log('Loading Screen shown - start rendering homepage!')
	  }
	
);

var mainUI = new UI.Card({
	title: 'Services',
	body: 'Developer Menu: UP for config vars DOWN for TestMenu Select for AJAX test',
	scrollable: true
  });
// show the card
mainUI.show();

mainUI.on('click', 'up', function(e) {
	var menu = new UI.Menu({
	  sections: [{
		items: [{
		  title: 'UserToken',
		  subtitle: `${Settings.option('userToken')}`,
		}, {
		  title: 'UserID',
		  subtitle: `${Settings.option('userID')}`,
		}, {
		  title: 'AppID',
		  subtitle: `${Settings.option('appID')}`,
		}]
	  }]
	});
	menu.on('select', function(e) {
	  console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
	  console.log('The item is titled "' + e.item.title + '"');
	});
	menu.show();
  });