/**
 * User: Carlos Olave (Mr. Peru)
 * Date: 11/22/14
 * Time: 8:34 PM
 */

function Carousel () {

	// Closure
	var self = this;

	////////////////////////////////////////////
	// Public

	// Creates the carousel
	self.create = function () {

		// Initialize carousel
		var exception = functionInit();
		if (exception !== null) {

			alert(exception);
		}

		// Detect Browser
		exception = functionDetectBrowser();
		if (exception !== null) {

			alert(exception);
		}

		// Create body content
		exception = functionCreateBodyCarousel();
		if (exception !== null) {

			alert(exception);
		}

		// TO DO....
		// Create sliders
		//exception = functionCreateSliders();
		//if (exception !== null) {

		//	alert(exception);
		//}

		// Style body content
		exception = functionStyleBodyCarousel();
		if (exception !== null) {

			alert(exception);
		}

		// Bind events to body
		exception =	functionBindEvents();
		if (exception !== null) {

			alert(exception);
		}
	};

	// Refresh carousel with given mode
	self.refresh = function (mode) {

		// Nothing to process.
		if ((mode === null) ||
			(mode === undefined) ||
			(mode == '') ||
			(mode == m_currentCarouselMode)) {

			return null;
		}

		// reset carousel with the matching mode.
		if (mode === "cylinder") {

			m_currentCarouselMode = "cylinder";
			functionDefaultCylinderTransformation();
		} else if (mode === "timeMachine") {

			m_currentCarouselMode = "timeMachine";
			functionDefaultTimeMachineTransformation();
		} else if (mode === "coverFlow") {

			m_currentCarouselMode = "coverFlow";
			functionDefaultCoverFlowTransformation();
		}
	};

	////////////////////////////////////////////
	// Private 

	// Initialize
	var functionInit = function () {

		try {

			var $carousel = $('#carousel');

			// Reflection attribute
			m_createReflection =  $carousel.data('reflection');
			if ((m_createReflection === undefined) ||
				(m_createReflection === null)) {

				m_createReflection = false;
			}

			// Sliders attribute
			m_createSliders = $carousel.data('sliders');
			if ((m_createSliders === undefined) ||
				(m_createSliders === null)) {

				m_createSliders = false;
			}

			// Mode attribute
			m_currentCarouselMode =  $carousel.data('mode');
			if ((m_currentCarouselMode === undefined) ||
				(m_currentCarouselMode === null)) {

					m_currentCarouselMode = "cylinder"
			}

			// RGB background color attribute
			m_backgroundColor = $carousel.data('reflection-color');
			if ((m_backgroundColor === undefined) ||
				(m_backgroundColor === null)) {

				m_backgroundColor = "rgba(74,86,100)";
			}

			return null;
		} catch (e) {

			return e;
		}
	};

	// Create body carousel
	var functionCreateBodyCarousel = function () {

		try {

			$imageCollection = $('.image-container');

			if (m_createReflection === true) {

				// container height needs to compensate for reflection image height.
				//m_containerHeight *= 2;

				// Add a reflection div and reflection image for each of the elements
				// in the image container. This is used to simulate reflection.
				$imageCollection.each(function( index ) {

					var srcImage = $(this).find('img').attr('src');
					var reflectionDiv =
						"<div class='reflection'>" +
							"<div class='before'></div>" +
							"<img src='" + srcImage +"'>" +
						"</div>";
					$(this).append(reflectionDiv);

				});
			}

			return null;
		} catch (e) {

			return e;
		}
	};

	// Style body carousel
	var functionStyleBodyCarousel = function () {

		try {

			// Create style section
		  	var $Style = $("<style media='screen' type='text/css'> </style>").appendTo("head");

			// Style container
			var exception = functionStyleContainer($Style);
			if (exception !== null) {

				return exception;
			}

			// Style container elements
			exception = functionStyleElements($Style);
			if (exception !== null) {

				return exception;
			}

			if (m_currentCarouselMode === "timeMachine") {

				functionDefaultTimeMachineTransformation();
			} else if (m_currentCarouselMode === "coverFlow") {

				functionDefaultCoverFlowTransformation();
			}

			return null;
		} catch (e) {

			return e;
		}
	};

	// create container element
	var functionStyleContainer = function ($Style) {

		try {

			var style = "#carousel-container { \r\n" +
				"\twidth: " + m_containerWidth + "px;\r\n" +
				"\theight: " + m_containerHeight + "px;\r\n" +
            	"\tposition: relative;\r\n" +
				"\ttop: 30px;\r\n" +
				"\tmargin: 0 auto 40px;\r\n" +
				"\tborder: 0px solid #CCC;\r\n"  +
				"\t" + m_attributePrefix + "perspective: 1100px;\r\n" +
				"}\r\n";

			$Style.append(style);

			return null
		} catch (e) {

			return e;
		}
	};

	// Create carousel element
	var functionStyleElements = function ($Style) {

		try {

			// Style carousel
			var style = "#carousel {\r\n" +
				"\twidth: 100%;\r\n" +
				"\theight: 100%;\r\n" +
				"\tposition: absolute;\r\n" +
				"\t" + m_attributePrefix + "transform: translateZ( -300px ) rotateX(0deg);\r\n" +
				"\t" + m_attributePrefix + "transform-style: preserve-3d;\r\n" +
				"\t" + m_attributePrefix + "transition: " + (m_attributePrefix === ""? '-webkit-' : m_attributePrefix) + "transform 1s;\r\n" +
			"}\r\n";

			// Style carousel image
			style += "#carousel .image-container {\r\n" +
				"\tdisplay: block;\r\n" +
				"\tposition: absolute;\r\n" +
				"\twidth: 276px;\r\n" +
				"\theight: 286px;\r\n" +
				"\tleft: 10px;\r\n" +
				"\ttop: 10px;\r\n" +
			"}\r\n";

			// Style carousel reflection
			style += "#carousel .reflection {\r\n" +
				"\twidth: 100%;\r\n" +
				"\theight: 100%;\r\n" +
				"\t" + m_attributePrefix + "transform: scaleY(-1);\r\n" +
				"\topacity: .2;\r\n" +
				"}\r\n";

			// Style before
			style += ".reflection .before {\r\n" +
				"\tposition: absolute;\r\n" +
				"\twidth: 100%;\r\n" +
				"\theight: 100%;\r\n" +
				"\tbox-shadow: inset " + m_backgroundColor + " 0 186px 65px;\r\n" +
				"}\r\n";


			// For each figure apply the transformation
			var degree = 0;
			var transformation = "";

			// do some trig to figure out how big the carousel
			// is in 3D space
			m_carouselRadius = Math.round((290/2) / Math.tan(Math.PI/$imageCollection.length));

			for (var i=0; i<$imageCollection.length; i++) {

				// Image transformation
				transformation += "#carousel .image-container:nth-child("+ (i+1) +") {\r\n" +
					"\t" + m_attributePrefix + "transform: rotateY(   "
						+ degree + "deg ) translateZ( " + m_carouselRadius +"px );\r\n" +
					"\ttransition: " + (m_attributePrefix === ""? '-webkit-' : m_attributePrefix) + "transform 1s;\r\n" +
					"}";

				degree += (360/$imageCollection.length);
			}
			style += transformation;

			// Style the img
			style += "#carousel .image-container img {\r\n" +
				"\theight: inherit;\r\n" +
				"\twidth: inherit;\r\n" +
				"\tdisplay: block;\r\n" +
			"}\r\n";

			$Style.append(style);

			return null;
		} catch (e) {

			return e;
		}
	};

	// Create sliders
	var functionCreateSliders = function () {

		try {

			if (m_createSliders === true) {

				var $Sliders = $('#carousel-container').parent();

				//var $Sliders = $("<section class='sliders'> </section>").appendTo("body");

				// Rotate X slider
				var sliderContent = "<section class='sliders'> <label id='rotateXLabel'>Rotate X</label>";
				sliderContent += "<input type=range min=-50 max=50 value=0 id='rotateXSlider' step='1'> </input>";

				// Rotate Z slider
				sliderContent += "<label id='translateZLabel'>Translate Z</label>";
				sliderContent += "<input type=range min=-300 max=300 value=-300 id='translateZSlider' step='5'> </input>";

				// Radio buttons
				sliderContent += "<div id='flowTypes'>" +
					"<input id='cylinder' type='radio' name='flows' value='cylinder' checked>Cylinder" +
					"<input id='timeMachine' type='radio' name='flows' value='timeMachine'>Time Machine" +
					"<input id='coverFlow' type='radio' name='flows' value='coverFlow'>CoverFlow" +
				"</div>" +
				"</section>";

				$Sliders.append(sliderContent);
			}

			return null;
		} catch (e) {

			return e;
		}
	};

	// Detect Browser
	var functionDetectBrowser = function () {

		try {

			/*
			 "-webkit-perspective: 1100px;" -> IE
			 "-moz-perspective: 1100px;" 	-> Mozilla
			 "-o-perspective: 1100px;" 		-> Opera
			 "perspective: 1100px;" 		-> Chrome
			 */

			var ua= navigator.userAgent, tem,
				M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

			if(/trident/i.test(M[1])){

				// IE
				m_attributePrefix = "-webkit-";
			}

			if(M[1]=== 'Chrome'){

				// Chrome
				m_attributePrefix = "";
			}
			else if (M[1] === 'Safari') {

				// Safari
				m_attributePrefix = "-webkit-";
			}
			else if (M[1] === 'Firefox') {

				// Firefox
				m_attributePrefix = "-moz-";
			}
			else {

				M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];

				if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);

				// Mozilla
				m_attributePrefix = "-moz-";
			}

			return null;
		} catch (e) {

			return e;
		}
	};

	// Bind event handler
	var functionBindEvents = function () {

		try {

			// Click event for each image
			$(".image-container").click(function(event) {

				if (m_currentCarouselMode === "cylinder") {

					var that = this;
					var clickedImageIndex = $(that).index();
					var previousSiblingIndex = $(that.previousSibling).index();

					previousSiblingIndex = (previousSiblingIndex < 0? $imageCollection.length-1 : previousSiblingIndex);
					var multiplier = 0;
					var shiftCount = 0;
					if (m_centerDisplayedImageIndex === previousSiblingIndex) {

						multiplier = 1;
						shiftCount = 2;
					} else {

						multiplier = -1;
						shiftCount = -2;
					}
					m_centerDisplayedImageIndex = ((clickedImageIndex + ($imageCollection.length) - shiftCount) % ($imageCollection.length));

					m_carouselThetaY += (360/$imageCollection.length); // * multiplier;
					$("#carousel").css(
						(m_attributePrefix + "transform"),
						("translateZ( " + m_carouselTranslateDeltaZ + "px ) rotateX(" + m_carouselRotateDeltaX + "deg) rotateY(" + m_carouselThetaY + "deg)"));

				} else if (m_currentCarouselMode === "timeMachine") {

					if (m_timeMachineForwardDirection === false)  {

						functionDefaultTimeMachineTransformation();
					} else {

						// Translate X axis the current image so it disappears
						$('.image-container:nth-child(' + (m_centerDisplayedImageIndex + 1) + ')').css(
							(m_attributePrefix + "transform"),
							"translateX( " + 500 + "px ) translateZ( " +
								1500 + "px )");

						// Transform the rest of the child images
						var timeMachineDeltaX = 0;
						var timeMachineDeltaZ = 439;
						for (var i=m_centerDisplayedImageIndex+2; i<=$imageCollection.length; i++) {

							// Translate X axis the current image so it disappears
							$('.image-container:nth-child(' + i + ')').css(
								(m_attributePrefix + "transform"),
								"translateX( " + timeMachineDeltaX + "px ) translateZ( " + timeMachineDeltaZ +"px )");

							timeMachineDeltaX -= 100;
							timeMachineDeltaZ -= 100;
						}

						// Update the current index of the carousel
						m_centerDisplayedImageIndex += 1;

						// Update if we no longer moving forward
						m_timeMachineForwardDirection = (m_centerDisplayedImageIndex === $imageCollection.length-1? false :
							(m_centerDisplayedImageIndex === 0? true : m_timeMachineForwardDirection));
					}
				} else if (m_currentCarouselMode === "coverFlow") {

					if (m_timeMachineForwardDirection === false) {

						functionDefaultCoverFlowTransformation();
					} else {

						// render left side
						var degreeY = 60;
						var defaultDeltaX = -530;
						var defaultDeltaZ = 0;
						for (var i=m_centerDisplayedImageIndex; i>=0; i--) {

							$('.image-container:nth-child(' + (i+1) + ')').css(
								(m_attributePrefix + "transform"),
								"rotateY(" + degreeY + "deg) translateZ(" + defaultDeltaZ +"px) translateX(" + defaultDeltaX + "px)");

							defaultDeltaZ -= 100;
						}

						// render middle
						$('.image-container:nth-child(' + (m_centerDisplayedImageIndex+2) + ')').css(
							(m_attributePrefix + "transform"),
							"rotateY(" + 0 + "deg) translateZ(" + 430 +"px) translateX(" + 0 + "px)");

						// render right side
						degreeY = -60;
						defaultDeltaX = 530;
						defaultDeltaZ = 0;
						for (var i=m_centerDisplayedImageIndex+3; i<=$imageCollection.length; i++) {

							$('.image-container:nth-child(' + i + ')').css(
								(m_attributePrefix + "transform"),
								"rotateY(" + degreeY + "deg) translateZ(" + defaultDeltaZ +"px) translateX(" + defaultDeltaX + "px)");

							defaultDeltaZ -= 100;
						}

						// Update the current index of the carousel
						m_centerDisplayedImageIndex += 1;

						// Update if we no longer moving forward
						m_timeMachineForwardDirection = (m_centerDisplayedImageIndex === $imageCollection.length-1? false :
							(m_centerDisplayedImageIndex === 0? true : m_timeMachineForwardDirection));
					}
				}
			});

			/*
			// Change on slider for Rotate X
			$("#rotateXSlider").on('input', function(e){

				m_carouselRotateDeltaX = $(this).val();
				$('#carousel').css(

					(m_attributePrefix + "transform"), "translateZ( " + m_carouselTranslateDeltaZ + "px ) rotateX(" + m_carouselRotateDeltaX + "deg) rotateY(" + m_carouselThetaY + "deg)"
				);
			});

			// Change on slider for Rotate Z
			$('#translateZSlider').on('input', function(e){

				m_carouselTranslateDeltaZ = $(this).val();
				$('#carousel').css(

					(m_attributePrefix + "transform"), "translateZ( " + m_carouselTranslateDeltaZ + "px ) rotateX(" + m_carouselRotateDeltaX + "deg) rotateY(" + m_carouselThetaY + "deg)"
				);
			});

			// Radio button change
			$('#flowTypes').change(function(e) {

				if (e.target.id === "cylinder") {

					m_currentCarouselMode = "cylinder";
					functionDefaultCylinderTransformation();
				} else if (e.target.id === "timeMachine") {

					m_currentCarouselMode = "timeMachine";
					functionDefaultTimeMachineTransformation();
				} else if (e.target.id === "coverFlow") {

					m_currentCarouselMode = "coverFlow";
					functionDefaultCoverFlowTransformation();
				}
			});

			*/

			return null;
		} catch (e) {

			return e;
		}
	};

	// Sets default values for carousel
	var functionSetDefaults = function () {

		try {

			// Reset carousel transformation
			$('#carousel').css(
				(m_attributePrefix + "transform"),
				"translateZ( -300px ) rotateX(0deg)"
			);

			// Default carousel X, Y, Z
			m_carouselRotateDeltaX = 0;
			m_carouselTranslateDeltaZ = -300;
			m_carouselThetaY = 0;

			// Default slider values
			$('#rotateXSlider').val(m_carouselRotateDeltaX);
			$('#translateZSlider').val(m_carouselTranslateDeltaZ);

			m_centerDisplayedImageIndex = 0;

			return null;
		} catch (e) {

			return e;
		}
	};

	// Applies default transformation to TimeMachine mode
	var functionDefaultTimeMachineTransformation = function () {

		var exception = functionSetDefaults();
		if (exception !== null) {

			alert(exception);
		}

		var defaultDeltaX = 0;
		var defaultDeltaZ = 439;
		for (var i=1; i<=$imageCollection.length; i++) {

			// Translate X axis the current image so it disappears
			$('.image-container:nth-child(' + i + ')').css(
				(m_attributePrefix + "transform"),
				"translateX( " + defaultDeltaX + "px ) translateZ( " + defaultDeltaZ +"px )");

			defaultDeltaX -= 100;
			defaultDeltaZ -= 100;
		}

		m_timeMachineForwardDirection = true;
	};

	// Applies default transformation to Cylinder mode
	var functionDefaultCylinderTransformation = function () {

		var exception = functionSetDefaults();
		if (exception !== null) {

			alert(exception);
		}

		var degree = 0;
		for (var i=1; i<=$imageCollection.length; i++) {

			$('.image-container:nth-child(' + i + ')').css(
				(m_attributePrefix + "transform"),
				"rotateY( " + degree + "deg ) translateZ( " + m_carouselRadius +"px )");
			degree += (360/$imageCollection.length);
		}
	};

	// Applies default transformation to CoverFlow mode
 	var functionDefaultCoverFlowTransformation = function () {

		var exception = functionSetDefaults();
		if (exception !== null) {

			alert(exception);
		}

		// render middle
		$('.image-container:nth-child(' + 1 + ')').css(
			(m_attributePrefix + "transform"),
			"rotateY(" + 0 + "deg) translateZ(" + 430 +"px) translateX(" + 0 + "px)");

		var degreeY = -60;
		var defaultDeltaX = 530;
		var defaultDeltaZ = 0;
		for (var i=2; i<=$imageCollection.length; i++) {

			$('.image-container:nth-child(' + i + ')').css(
				(m_attributePrefix + "transform"),
				"rotateY(" + degreeY + "deg) translateZ(" + defaultDeltaZ +"px) translateX(" + defaultDeltaX + "px)");

			defaultDeltaZ -= 100;
		}

		m_timeMachineForwardDirection = true;
	};

	///////////////////////////////////
	// Private Fields

	// Container width and height
	var m_containerWidth = 310;
	var m_containerHeight = 330;

	// Carousel X and Y and Z rotation change
	var m_carouselRotateDeltaX = 0;
	var m_carouselTranslateDeltaZ = -300;
	var m_carouselThetaY = 0;
	var m_carouselRadius = 0;

	// Body element background color
	var m_backgroundColor = "rgb(74,86,100)";

	// Attribute prefix is for cross browser support Opera/Mozilla/Chrome/IE
	var m_attributePrefix = null;

	// Carousel supports three modes (cylinder, timeMachine, and xxx)
	var m_currentCarouselMode = "cylinder";

	// jquery object for the collection of images
	var $imageCollection = null;

	//	The current index of center image displayed
	var m_centerDisplayedImageIndex = 0;

	// Default direction for TimeMachine mode
	var m_timeMachineForwardDirection = true;

	// Default values
	var m_createReflection = false;
	var m_createSliders = false;
}
