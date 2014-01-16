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