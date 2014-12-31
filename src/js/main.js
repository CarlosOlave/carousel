/**
 * User: Carlos Olave (Mr. Peru)
 * Date: 11/19/14
 * Time: 8:56 PM
 */

var init = function() {

	// Creates the carousel widget
	var carousel = new Carousel();
	carousel.create();

	// change color of body to give a better impression
	$('body').css(
		{
			height : '800px',
			background: '-moz-gradient(linear, left top, left bottom, color-stop(0%,rgba(171,179,195,1)), color-stop(35%,rgba(74,86,10,1)))',
			background: '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(171,179,195,1)), color-stop(35%,rgba(74,86,10,1)))'
		}
	);

	function modes() {

		$(".btn-group > .btn").click(function(e){

			carousel.refresh(e.currentTarget.id);
		});
	}

	// Set event handlers modes 
	modes();
};

// Attach to load event handler
window.addEventListener('DOMContentLoaded', init, false);



