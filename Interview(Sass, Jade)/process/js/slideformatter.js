/*jshint esversion: 6 */

var slideVehicle1 = document.querySelector("#spotlight_slideshow.slideVehicle");
var slides1 = slideVehicle1.querySelectorAll(".entryslide.slideItem");
var firstSlide1 = slides1[0];
var lastSlide1 = slides1[slides1.length-1];
var slideWidth1 = 235;
var translationAmount1, slideVehicleSize1, currentSlideList1, slideIndex1, slideDuration1, firstSlideIndex1, lastSlideIndex1, firstSlidePosition1, lastSlidePosition1, increment1 = 0;





// Generating arrows.
var anewNode = document.createElement("div");
var anewNode2 = document.createElement("div");

anewNode.classList.add('arrow');
anewNode.classList.add('prev');
anewNode2.classList.add('arrow');
anewNode2.classList.add('next');
slideVehicle1.insertAdjacentElement('beforebegin', anewNode);
slideVehicle1.insertAdjacentElement('beforebegin', anewNode2);

var nextButton1 = document.querySelector("#spotlight .arrow.next");
var prevButton1 = document.querySelector("#spotlight .arrow.prev");





// Place an empty copy of the last slide before the first.
lastSlide1 = lastSlide1.cloneNode(true);

// empty(lastSlide.querySelector("ul"));
slideVehicle1.insertBefore(lastSlide1, firstSlide1);

// Place an empty copy of the first slide after the last. 
firstSlide1 = firstSlide1.cloneNode(true);

// empty(firstSlide.querySelector("ul"));
slideVehicle1.appendChild(firstSlide1);

// Calculate slideVehicle translation amount.
translationAmount1 = reduceDecimal1(100/(slides1.length + 2));
firstSlidePosition1 = firstSlideIndex1 = 0;
lastSlidePosition1 = translationAmount1 * (slideVehicle1.childElementCount - 1);
lastSlideIndex1 = (slideVehicle1.childElementCount - 2);










function init1() {
	increment1 -= translationAmount1;
	slideIndex1 = 0;

	toggleActiveState1(slides1[slideIndex1]);
	setTranslation1(increment1);
	enableArrowButtons1();
}

function nextSlide1() {
	increment1 -= translationAmount1;
	slideIndex1++;

	setTranslation1(increment1);
	checkSlidePosition1();
}

function previousSlide1() {
	increment1 += translationAmount1;
	slideIndex1--;

	setTranslation1(increment1);
	checkSlidePosition1();
}

function autoNext1(slide) {
	currentSlideList1 = slide.querySelector("ul");

	// Code for Chrome, Safari and Opera
	currentSlideList1.addEventListener("webkitAnimationEnd", nextSlide1);

	// Standard syntax
	currentSlideList1.addEventListener("animationend", nextSlide1);

	setSlideDuration1(currentSlideList1);
	console.log("auto slide");
}

function checkSlidePosition1() {
	if (slideIndex1 < firstSlideIndex1) {
		increment1 = (-1 * (lastSlidePosition1 - translationAmount1));
		slideIndex1 = slides1.length-1;

		pauseArrowButtons1();
		resetSlideShowMechanisms1();
	}
	else if (slideIndex1 === lastSlideIndex1) {
		increment1 = (-1 * (firstSlidePosition1 + translationAmount1));
		slideIndex1 = 0;

		pauseArrowButtons1();
		resetSlideShowMechanisms1();
	}

	toggleActiveState1(slides1[slideIndex1]);
	console.log("Current slide: " + slideIndex1);
}

function pauseArrowButtons1() {
	nextButton1.removeEventListener('click', nextSlide1);
	prevButton1.removeEventListener('click', previousSlide1);
}

function resetSlideShowMechanisms1() {
	setTimeout(function() {
		pauseTransitions1();
		setTranslation1(increment1);

		setTimeout(function() {
			console.log("arrows enabled");
			setTransitions1('0.5s');
			enableArrowButtons1();
		}, 500);
	}, 1000);
}

function pauseTransitions1() {
	slideVehicle1.style.transition = '0s';
}

function setTranslation1(amount) {
	slideVehicle1.style.transform = "translateX("+amount+"%)";
}

function setTransitions1(amount) {
	slideVehicle1.style.transition = amount;
}

function setWidthIE1() {
	var ua, msie;

	// If Internet Explorer, then...
	ua = window.navigator.userAgent;
	msie = ua.indexOf("MSIE ");
	// ..alter the css of the following elements.
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		slideVehicleSize1 = slideVehicle1.childElementCount * slideWidth1;
		slideVehicle1.style.width = slideVehicleSize1 + "px";

		console.log("slide width: " + slideWidth1);
		console.log("vehicle size: " + slideVehicleSize1);
	}
}

function setSlideDuration1(slideList) {
	slideDuration1 = (slideList.offsetHeight/28) + 's';


	// Internet Explorer work around.
	// Setting the slide duration through js doesn't work right away. 
	// The code below removes and reapplies the animation css
	// with the updated duration.
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		slideList.parentNode.classList.remove('active');
		
		setTimeout(function() {
			slideList.parentNode.classList.add('active');
			slideList.style.animationDuration = slideDuration1;
		}, 100);
	}
	else {
		slideList.style.animationDuration = slideDuration1;
	}
	
}

function enableArrowButtons1() {
	nextButton1.addEventListener('click', nextSlide1);
	prevButton1.addEventListener('click', previousSlide1);
}

function toggleActiveState1(slide) {
	for (var i = 0; i < slides1.length; i++) {
		slides1[i].classList.remove('active');
	}

	slide.classList.toggle('active');
	//autoNext(slide);
}

function empty1(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function reduceDecimal1(value) {
	value = (Math.round(value * 100) / 100).toFixed(2);

	return parseFloat(value);
}

// Initialize slideshow
setWidthIE1();
init1();