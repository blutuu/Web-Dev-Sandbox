/*jshint esversion: 6 */

var slideVehicle = document.querySelector(".slideVehicle");
var slides = slideVehicle.querySelectorAll(".slideItem");
var firstSlide = slides[0];
var lastSlide = slides[slides.length-1];
var slideWidth = 226;
var translationAmount, slideVehicleSize, currentSlideList, slideIndex, slideDuration, firstSlideIndex, lastSlideIndex, firstSlidePosition, lastSlidePosition, increment = 0;





// Generating arrows.
var newNode = document.createElement("div");
var newNode2 = document.createElement("div");

newNode.classList.add('arrow');
newNode.classList.add('prev');
newNode2.classList.add('arrow');
newNode2.classList.add('next');
slideVehicle.insertAdjacentElement('beforebegin', newNode);
slideVehicle.insertAdjacentElement('beforebegin', newNode2);

var nextButton = document.querySelector(".arrow.next");
var prevButton = document.querySelector(".arrow.prev");





// Place an empty copy of the last slide before the first.
lastSlide = lastSlide.cloneNode(true);

empty(lastSlide.querySelector("ul"));
slideVehicle.insertBefore(lastSlide, firstSlide);

// Place an empty copy of the first slide after the last. 
firstSlide = firstSlide.cloneNode(true);

empty(firstSlide.querySelector("ul"));
slideVehicle.appendChild(firstSlide);

// Calculate slideVehicle translation amount.
translationAmount = reduceDecimal(100/(slides.length + 2));
firstSlidePosition = firstSlideIndex = 0;
lastSlidePosition = translationAmount * (slideVehicle.childElementCount - 1);
lastSlideIndex = (slideVehicle.childElementCount - 2);




// If Internet Explorer, then...
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
// ..alter the css of the following elements.
if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
	slideVehicleSize = slideVehicle.childElementCount * slideWidth;
	slideVehicle.style.width = slideVehicleSize;

	console.log("vehicle size: " + slideVehicleSize);
}






function init() {
	increment -= translationAmount;
	slideIndex = 0;

	toggleActiveState(slides[slideIndex]);
	setTranslation(increment);
	enableArrowButtons();
}

function nextSlide() {
	increment -= translationAmount;
	slideIndex++;

	setTranslation(increment);
	checkSlidePosition();
}

function previousSlide() {
	increment += translationAmount;
	slideIndex--;

	setTranslation(increment);
	checkSlidePosition();
}

function autoNext(slide) {
	currentSlideList = slide.querySelector("ul");

	// Code for Chrome, Safari and Opera
	currentSlideList.addEventListener("webkitAnimationEnd", nextSlide);

	// Standard syntax
	currentSlideList.addEventListener("animationend", nextSlide);

	setSlideDuration(currentSlideList);
	console.log("auto slide");
}

function checkSlidePosition() {
	if (slideIndex < firstSlideIndex) {
		increment = (-1 * (lastSlidePosition - translationAmount));
		slideIndex = slides.length-1;

		pauseArrowButtons();
		resetSlideShowMechanisms();
	}
	else if (slideIndex === lastSlideIndex) {
		increment = (-1 * (firstSlidePosition + translationAmount));
		slideIndex = 0;

		pauseArrowButtons();
		resetSlideShowMechanisms();
	}

	toggleActiveState(slides[slideIndex]);
	console.log("Current slide: " + slideIndex);
}

function pauseArrowButtons() {
	nextButton.removeEventListener('click', nextSlide);
	prevButton.removeEventListener('click', previousSlide);
}

function resetSlideShowMechanisms() {
	setTimeout(function() {
		pauseTransitions();
		setTranslation(increment);

		setTimeout(function() {
			console.log("arrows enabled");
			setTransitions('0.5s');
			enableArrowButtons();
		}, 500);
	}, 1000);
}

function pauseTransitions() {
	slideVehicle.style.transition = '0s';
}

function setTranslation(amount) {
	slideVehicle.style.transform = "translateX("+amount+"%)";
}

function setTransitions(amount) {
	slideVehicle.style.transition = amount;
}

function setSlideDuration(slideList) {
	slideDuration = (slideList.offsetHeight/28) + 's';


	// Internet Explorer work around.
	// Setting the slide duration through js doesn't work right away. 
	// The code below removes and reapplies the animation css
	// with the updated duration.
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		slideList.parentNode.classList.remove('active');
		
		setTimeout(function() {
			slideList.parentNode.classList.add('active');
			slideList.style.animationDuration = slideDuration;
		}, 100);
	}
	else {
		slideList.style.animationDuration = slideDuration;
	}
	
}

function enableArrowButtons() {
	nextButton.addEventListener('click', nextSlide);
	prevButton.addEventListener('click', previousSlide);
}

function toggleActiveState(slide) {
	for (var i = 0; i < slides.length; i++) {
		slides[i].classList.remove('active');
	}

	slide.classList.toggle('active');
	autoNext(slide);
}

function empty(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function reduceDecimal(value) {
	value = (Math.round(value * 100) / 100).toFixed(2);

	return parseFloat(value);
}

// Initialize slideshow
init();