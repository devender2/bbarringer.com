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