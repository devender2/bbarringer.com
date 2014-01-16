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