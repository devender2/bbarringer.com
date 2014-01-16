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