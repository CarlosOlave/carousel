/**
 * User: Carlos Olave (Mr. Peru)
 * Date: 11/22/14
 * Time: 8:34 PM
 */

function Carousel () {

	////////////////////////////////////////////
	// Public

	// Creates the carousel
	this.create = function () {

		// Initialize carousel
		var exception = initialize();
		if (exception !== null) {

			alert(exception);
		}

		// Detect Browser
		exception = detectBrowser();
		if (exception !== null) {

			alert(exception);
		}

		// Add reflection element to the images
		exception = createReflectiveElements();
		if (exception !== null) {

			alert(exception);
		}

		// Set initial state of carousel
		exception = setCarouselViewMode();
		if (exception !== null) {

			alert(exception);
		}
	};

	// Refresh carousel with given mode
	this.refresh = function (mode) {

		// Nothing to process.
		if ((mode === null) ||
			(mode === undefined) ||
			(mode == '') ||
			(mode == m_currentCarouselMode)) {

			return null;
		}

		// Set the mode and call function to render new carousel view
		m_currentCarouselMode = mode;
		setCarouselViewMode();
	};

	////////////////////////////////////////////
	// Private

	// Loads carousel data attributes and sets click event handler
	var initialize = function () {

		try {

			m_carousel = document.getElementsByClassName("carousel")[0];

			// Reflection attribute
			m_createReflection = m_carousel.getAttribute("data-reflection");
			m_createReflection = m_createReflection === "true";

			// Mode attribute
			m_currentCarouselMode =  m_carousel.getAttribute("data-mode");
			if ((m_currentCarouselMode === undefined) ||
				(m_currentCarouselMode === null)) {

					m_currentCarouselMode = "cylinder"
			}

			// RGB background color attribute
			m_backgroundColor = m_carousel.getAttribute("data-reflection-color");
			if ((m_backgroundColor === undefined) ||
				(m_backgroundColor === null)) {

				m_backgroundColor = "rgba(74,86,100)";
			}

			// Bind event handler
			m_carousel.addEventListener("click", throttle(function(event) {

				if (event.target !== event.currentTarget) {
					var parentItem = event.target.parentElement;
					var parentIndex = parentItem.getAttribute("data-index");
					transformationHandler(parentItem, parentIndex);
				}
				event.stopPropagation();
			}, 300), false);

			return null;
		} catch (e) {

			return e;
		}
	};

	// Creates a reflection element for each of the images
	var createReflectiveElements = function () {

		try {

			imageCollection = document.getElementsByClassName("image-container");

			if (m_createReflection === true) {

				// Add a reflection element to each of the images
				for (var i = 0; i < imageCollection.length; i++) {

					// Image element that will get the reflection
					var imageContainer = imageCollection[i];

					// Set the container index
					imageContainer.setAttribute("data-index", i);

					// Extract the source of the image
					var imgEl = imageContainer.firstElementChild;
					var srcImage = imgEl.getAttribute("src");

					// Create reflection element
					var reflectionContainer = document.createElement("div");
					reflectionContainer.className = "reflection-container";
					var reflectionGradient = document.createElement("div");
					reflectionGradient.className = "before";
					reflectionGradient.style["box-shadow"] = "inset " + m_backgroundColor + " 0 186px 65px";
					var reflectionImg = document.createElement("img");
					reflectionImg.setAttribute("src", srcImage);
					reflectionContainer.appendChild(reflectionGradient);
					reflectionContainer.appendChild(reflectionImg);

					// Finally perform DOM change by adding reflective element
					imageContainer.appendChild(reflectionContainer);
				}
			}

			return null;
		} catch (e) {

			return e;
		}
	};

	// Sets the carousel view mode (cylinder, time-machine, or cover-flow)
	var setCarouselViewMode = function () {

		try {

			if (m_currentCarouselMode === "cylinder") {

				defaultCylinderTransformation()
			}
			else if (m_currentCarouselMode === "timeMachine") {

				defaultTimeMachineTransformation();
			} else if (m_currentCarouselMode === "coverFlow") {

				defaultCoverFlowTransformation();
			}

			return null;
		} catch (e) {

			return e;
		}
	};

	// Detect Browser
	var detectBrowser = function () {

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

	// Throttles the invocation of the transformation function by 300ms
	var throttle = function (fn, delay) {

		var timer = null;
		return function () {
			var context = this, args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		};
	};

	// Transforms carousel changes upon user click
	var transformationHandler = function (el, index) {

		if (m_currentCarouselMode === "cylinder") {

			m_carouselThetaY += (360/imageCollection.length);
			m_carousel.style[m_attributePrefix+"transform"]  = "translateZ("+m_carouselTranslateDeltaZ+"px) rotateX("+m_carouselRotateDeltaX+"deg) rotateY("+m_carouselThetaY+"deg)";

		} else if (m_currentCarouselMode === "timeMachine") {

			if (m_timeMachineForwardDirection === false)  {

				defaultTimeMachineTransformation();
			} else {

				// Translate X axis the current image so it disappears
				var imageContainer = imageCollection[m_centerDisplayedImageIndex];
				imageContainer.style[m_attributePrefix+"transform"] = "translateX( " + 500 + "px ) translateZ( " + 1500 + "px )";

				// Transform the rest of the child images
				var timeMachineDeltaX = 0;
				var timeMachineDeltaZ = 439;
				for (var i=m_centerDisplayedImageIndex+1; i<imageCollection.length; i++) {

					// Translate X axis the current image so it disappears
					imageContainer = imageCollection[i];
					imageContainer.style[m_attributePrefix+"transform"] = "translateX( " + timeMachineDeltaX + "px ) translateZ( " + timeMachineDeltaZ +"px )";
					timeMachineDeltaX -= 100;
					timeMachineDeltaZ -= 100;
				}

				// Update the current index of the carousel
				m_centerDisplayedImageIndex += 1;

				// Update if we no longer moving forward
				m_timeMachineForwardDirection = (m_centerDisplayedImageIndex === imageCollection.length-1? false :
					(m_centerDisplayedImageIndex === 0? true : m_timeMachineForwardDirection));
			}
		} else if (m_currentCarouselMode === "coverFlow") {

			if (m_timeMachineForwardDirection === false) {

				defaultCoverFlowTransformation();
			} else {

				// render left side
				var degreeY = 60;
				var defaultDeltaX = -530;
				var defaultDeltaZ = 0;
				var imageContainer = null;
				for (var i=m_centerDisplayedImageIndex; i>=0; i--) {

					imageContainer = imageCollection[i];
					imageContainer.style[m_attributePrefix+"transform"] = "rotateY(" + degreeY + "deg) translateZ(" + defaultDeltaZ +"px) translateX(" + defaultDeltaX + "px)";
					defaultDeltaZ -= 100;
				}

				// render middle
				imageContainer = imageCollection[m_centerDisplayedImageIndex+1];
				imageContainer.style[m_attributePrefix+"transform"] = "rotateY(" + 0 + "deg) translateZ(" + 430 +"px) translateX(" + 0 + "px)";

				// render right side
				degreeY = -60;
				defaultDeltaX = 530;
				defaultDeltaZ = 0;
				for (var i=m_centerDisplayedImageIndex+2; i<imageCollection.length; i++) {

					imageContainer = imageCollection[i];
					imageContainer.style[m_attributePrefix+"transform"] = "rotateY(" + degreeY + "deg) translateZ(" + defaultDeltaZ +"px) translateX(" + defaultDeltaX + "px)";
					defaultDeltaZ -= 100;
				}

				// Update the current index of the carousel
				m_centerDisplayedImageIndex += 1;

				// Update if we no longer moving forward
				m_timeMachineForwardDirection = (m_centerDisplayedImageIndex === imageCollection.length-1? false :
					(m_centerDisplayedImageIndex === 0? true : m_timeMachineForwardDirection));
			}
		}
	};

	// Sets default values for carousel
	var setDefaults = function () {

		try {

			// Reset carousel transformation
			m_carousel.style[m_attributePrefix+"transform"] = "translateZ( -300px ) rotateX(0deg)";

			// do some trig to figure out how big the carousel
			// is in 3D space
			m_carouselRadius = Math.round((290/2) / Math.tan(Math.PI/imageCollection.length));

			// Default carousel X, Y, Z
			m_carouselRotateDeltaX = 0;
			m_carouselTranslateDeltaZ = -300;
			m_carouselThetaY = 0;

			m_centerDisplayedImageIndex = 0;

			return null;
		} catch (e) {

			return e;
		}
	};

	// Applies default transformation to TimeMachine mode
	var defaultTimeMachineTransformation = function () {

		var exception = setDefaults();
		if (exception !== null) {

			alert(exception);
		}

		var defaultDeltaX = 0;
		var defaultDeltaZ = 439;
		for (var i=0; i<imageCollection.length; i++) {

			var imageContainer = imageCollection[i];
			imageContainer.style[m_attributePrefix+"transform"] = "translateX( " + defaultDeltaX + "px ) translateZ( " + defaultDeltaZ +"px )";
			defaultDeltaX -= 100;
			defaultDeltaZ -= 100;
		}

		m_timeMachineForwardDirection = true;
	};

	// Applies default transformation to Cylinder mode
	var defaultCylinderTransformation = function () {

		var exception = setDefaults();
		if (exception !== null) {

			alert(exception);
		}

		var degree = 0;
		for (var i=0; i<imageCollection.length; i++) {

			var imageContainer = imageCollection[i];
			imageContainer.style[m_attributePrefix+"transform"]  = "rotateY( " + degree + "deg ) translateZ( " + m_carouselRadius +"px )";
			degree += (360/imageCollection.length);
		}
	};

	// Applies default transformation to CoverFlow mode
 	var defaultCoverFlowTransformation = function () {

		var exception = setDefaults();
		if (exception !== null) {

			alert(exception);
		}

		// middle element
		var imageContainer = imageCollection[0];
		imageContainer.style[m_attributePrefix+"transform"] = "rotateY(" + 0 + "deg) translateZ(" + 430 +"px) translateX(" + 0 + "px)";

		var degreeY = -60;
		var defaultDeltaX = 530;
		var defaultDeltaZ = 0;
		for (var i=1; i<imageCollection.length; i++) {

			imageContainer = imageCollection[i];
			imageContainer.style[m_attributePrefix+"transform"] = "rotateY(" + degreeY + "deg) translateZ(" + defaultDeltaZ +"px) translateX(" + defaultDeltaX + "px)";
			defaultDeltaZ -= 100;
		}

		m_timeMachineForwardDirection = true;
	};

	///////////////////////////////////
	// Private Fields

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
	var imageCollection = null;

	//	The current index of center image displayed
	var m_centerDisplayedImageIndex = 0;

	// Default direction for TimeMachine mode
	var m_timeMachineForwardDirection = true;

	// Default values
	var m_createReflection = false;

	// Carousel element
	var m_carousel = null;
}
