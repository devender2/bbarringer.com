/////////////////////////////////////////////////////////////////
// Templates ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/**

	Description:
	
	Contains javascript templates. These can be compiled with a templating engine
	(included with Underscore). Much cleaner way of inserting markup from JS compared
	to raw strings or generating new elements manually. Globally available in App.Templates.

	Example:

	// Returns a function which will return a new example element when called
	var example = _.template( app.Templates.practice );

	// Create a new element with the passed args
	var newElement = example( {<args-as-defined-in-template>} );

	// Pop the new finished element in
	$('body').append( newElement );

	See: http://underscorejs.org/#template

**/

var App = ( function ( app ) {

	app.Templates = {

		example: ' \
		<div id="practice-<%= index %>" class="practice"> \
			<div class="info"> \
				<div class="practice-name"> \
					<h4><%= name %></h4> \
					<ul class="icons"> \
						<% if ( certified_practice ) { %><li class="icons-certified-practice"></li><% } %> \
						<% if ( board_member ) { %><li class="icons-board-member"></li><% } %> \
						<% if ( medallion_member ) { %><li class="icons-medallion-member"></li><% } %> \
					</ul> \
				</div> \
				\
				<ul class="doctors"> \
					<% _.each( doctors, function ( doctor ) { %> \
					<li><%= doctor %></li> \
					<% }); %> \
				</ul> \
			</div> \
		</li> \
		'

	};

	return app;

})( App || {} );
/////////////////////////////////////////////////////////////////
// App config ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/**

	Description:
	
	Add global config variables such as timeouts, # of thumbnails, # of tweets, etc.
	Timers is for globally keeping track of setTimeout/setInterval vars.

**/

var App = ( function ( app ) {

	app.Config = {

		//option: 			value,

	}

	app.Timers = {
		//timer: 			null
	}

	return app;

})( App || {} );
/////////////////////////////////////////////////////////////////
// Internal functions ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/**

	Description:
	
	"Utility" functions used globally throughout the rest of the app.
	Example: EmbedVideo, CreateGoogleMap, IsIE, etc.

**/

var App = ( function ( app ) {

	app.__ = {

		// Args: video_id, element, width, height
		// Requires: swfobject
		EmbedVideo: function ( args ) {
			swfobject.embedSWF( "http://www.youtube.com/v/" + args.video_id + "?enablejsapi=1&playerapiid=ytplayer&version=3&wmode=transparent&showinfo=0&rel=0",
				args.element,
				args.width ? args.width : '780',
				args.height ? args.height : '465',
				'8',
				null,
				null, 
				{ allowScriptAccess: 'always', wmode: 'transparent' },
				{ id: args.element }
			);
		},

		// True if IE < 10
		// IE10 is NOT necessarily === Chrome/FF
		IsIE: function () {
			return ! $.support.leadingWhitespace || ! $.support.placeholder;
		},

		// Attach message of specified type to specified parent element
		ThrowError: function ( parent, message, type ) {
			var type = ( type || 'error' );

			if( ! $(parent).find( '.' + type ).length ) {
				$(parent).append( $('<div/>', { 'class': type }) );
			} 

			$(parent).find( '.' + type ).fadeOut( 250, function () {
				$(parent).find( '.' + type ).html( message ).fadeIn( 250 );
			});
		},

		// Force download of a file - handy for text files that Chrome will try
		// to open.
		ForceDownload: function ( url ) {
			var iframe = document.getElementById( 'hiddenDownloader' );

			if ( iframe === null ) {
				iframe = document.createElement( 'iframe' );  
				iframe.id = 'hiddenDownloader';
				iframe.style.display = 'none';
				document.body.appendChild( iframe );
			}
			
			iframe.src = url; // Trigger the download
		}

	}

	return app;

})( App || {} );
/////////////////////////////////////////////////////////////
// Component functions //////////////////////////////////////
/////////////////////////////////////////////////////////////

/**

	Description:
	
	Contains components functionality.  This applies to specific site components such
	as a twitter feed, sidebar, graph, etc.

	Todo: switch to routes so the above happens automatically.

**/

var App = ( function ( app ) {

	app.Components = {

		Component: function () {

			// Execute component functionality
			
		}

	}

	return app;

})( App || {} );
/////////////////////////////////////////////////////////////////
// Event functions //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/**

	Description:
	
	Contains functions tied to events (created in app.js). Available globally
	in App.Events, so feel free to trigger these outside of event bindings.

**/

var App = ( function ( app ) {

	app.Events = {
		
		ExampleFunction: function ( event ) {
			// $(event.currentTarget) is equivalent to $(this) in jQuery event
			// binding. preventDefault and stopPropagation should work as 
			// advertised like normal.
			var target = $(event.currentTarget);
		}

	}

	return app;

})( App || {} );
/////////////////////////////////////////////////////////////////
// Initialization functions /////////////////////////////////////
/////////////////////////////////////////////////////////////////

/**

	Description:
	
	Global startup events. Should be JS functionality to be applied to all/most
	pages. Includes window and keyboard events which are bound separately from
	normal Backbone events.

**/

var App = ( function ( app ) {

	app.Init = {

		Extensions: function () {
			// Add check-for-placeholder support to Support.  Not included natively.
			$.support.placeholder = (function(){
			 	var i = document.createElement('input');
				return 'placeholder' in i;
			})();
		},

		// App isn't bound to the window (and can't be), so events above body have to be dealt with separately
		WindowEvents: function () {
			// Browser-agnostic window offset
			var windowOffset = document.documentElement.scrollTop || window.scrollY;

			$(window).scroll( function () {
				windowOffset = document.documentElement.scrollTop || window.scrollY;

				// Scroll functionality				
			});

			$(window).resize( function() {
				// Resize functionality
			});
		},

		// Bound separately from Backbone events for the same reason as above
		KeyboardEvents: function () {
			$(document).keydown( function( event ) {
				// Example - enter key
				if ( event.keyCode == 13 ) {
					// Enter pressed
				}
			});			
		}

	}

	return app;

})( App || {} );
/////////////////////////////////////////////////////////////////
// Main application /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/**

	Description:
	
	The heart of everything. Can call methods/properties from __, Events, Init, etc. (or
	any other files you add) and handles event bindings via events (see example). Props/methods
	from all files are loaded into the global App object and in theory it doesn't matter what
	order the files are loaded in (though this isn't bulletproof depending on what you do).

	Recommended load order:
	Config --> Templates --> __ --> Init --> Events --> Components --> App

**/

var App = ( function ( app ) {

	var Application = Backbone.View.extend({

		// View attributes loaded from config.js - available internally as this.attributes or
		// externally as App.Config
		attributes: app.Config,

		/////////////////////////////////////////////////////////////////
		// Init /////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////

		// Startup - starter functions for global JS, window/event binding (because the native
		// view can't handle these) + page-specific functionality
		initialize: function () {

			$ = this.jQuery || jQuery || window.jQuery; // In case $.noConflict was called

			// Setup /////////////////////////////////////////////////////////////////

			// Extend events.js into the view so Backbone can delegate events to them
			_.extend( this, app.Events );

			// Add any necessary 3rd party JS/extensions/enhancements/bling/spinners
			app.Init.Extensions();

			// Window events - bound outside Backbone events system
			app.Init.WindowEvents();

			// Keyboard events - bound outside Backbone events system
			app.Init.KeyboardEvents();

			// Startup (global) functionality ///////////////////////////////////////////////////

			this.LoadInit();

			// App components /////////////////////////////////////////////////////////

			this.LoadComponents();

		},

		LoadInit: function () {

			// Functionality which should be used across the entire (or most) of the site

		},

		LoadComponents: function () {

			// Functionality specific to site components (twitter feed, sidebar, etc.)

		},

		////////////////////////////////////////////////////
		// Event bindings //////////////////////////////////
		////////////////////////////////////////////////////

		// Backbone events are always delegated.  Events should be tied to functions in events.js
		events: {

			// Global events /////////////////////////////////////

			//'<event-type> <selector>' 	: '<function-name>',

			// Page events //////////////////////////////////////////

			//'click body a'				: 'ExampleFunction'

		}
		
	});

	///////////////////////////////////////////////////////
	// START THE MUZAK ////////////////////////////////////
	///////////////////////////////////////////////////////

	app.View = new Application({ el: 'body' });

	return app;

})( App || {} );