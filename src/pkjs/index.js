require('pebblejs');
var UI = require('pebblejs/ui');

//clay
var Clay = require('pebble-clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig)
var claySettings = clay.getSettings();


// when system is ready, do this stuff
Pebble.addEventListener("ready",
  function(e) {
	// get clay settings and store it to our global settings variable so we can access it later
	// TODO: better logging for this
	// create a new ui card
	// maybe if we get this inside of the event listener then itll work?
    var card = new UI.Card({
	    title: 'Hello World',
	    body: `${claySettings.test1}`,
	    scrollable: true
      });
    // show the card
    card.show();
	  }
	
);
