// Main JavaScript file for the website
//Auto update the year in the footer
document.getElementById("date").textContent = new Date().getFullYear();

//Burger
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const cross = document.getElementById("cross");
const menuLinks = document.querySelectorAll("a");

burger.addEventListener("click", () => {
	menu.classList.remove("hidden");
	cross.classList.remove("hidden");
	burger.classList.toggle("hidden");
	document.body.classList.add("disable-scroll");
});

cross.addEventListener("click", () => {
	cross.classList.toggle("hidden");
	menu.classList.toggle("hidden");
	burger.classList.toggle("hidden");
	document.body.classList.remove("disable-scroll");
});

//removes menu on link click inside the menu
menuLinks.forEach((a) => {
	a.addEventListener("click", () => {
		menu.classList.add("hidden");
		document.body.classList.remove("disable-scroll");
	});
});

//IMAGES SCRIPTS//
//////////////////

//Replaces the source image depending on screen size
function updateSource() {
	const width = window.innerWidth;
	const images = document.querySelectorAll(".grid img");

	images.forEach((img) => {
		const src = img.getAttribute("src");
		if (width >= 599) {
			img.setAttribute("src", src.replace("_sm", "_md"));
		}
	});
}

window.addEventListener("resize", updateSource);
window.addEventListener("load", updateSource);

//IMG LIGHTBOX//
const images = document.querySelectorAll(".grid img");
const popupImage = document.querySelector("#lightbox-img");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const popup = document.querySelector(".popup");

let currentIndex = 0;

images.forEach((img, index) => {
	img.addEventListener("click", () => {
		currentIndex = index;
		popupImage.src = img.src;
		popup.classList.add("show");
		document.body.classList.add("disable-scroll");
	});
});

prevBtn.addEventListener("click", () => {
	currentIndex = (currentIndex - 1 + images.length) % images.length;
	popupImage.src = images[currentIndex].src;
});

nextBtn.addEventListener("click", () => {
	currentIndex = (currentIndex + 1) % images.length;
	popupImage.src = images[currentIndex].src;
});

popup.addEventListener("click", (e) => {
	if (e.target === popup) {
		popup.classList.remove("show");
		document.body.classList.remove("disable-scroll");
	}
});

// Store touch coordinates
let touchStartX = 0;
let touchEndX = 0;
let isTouching = false; // Flag to track if we're in a touch sequence

// Add touch event listeners to the popup image
popup.addEventListener("touchstart", handleTouchStart, { passive: false });
popup.addEventListener("touchmove", handleTouchMove, { passive: false });
popup.addEventListener("touchend", handleTouchEnd, { passive: false });
popup.addEventListener("touchcancel", handleTouchCancel, { passive: false });

// Handle touch start event
function handleTouchStart(event) {
	isTouching = true;
	touchStartX = event.touches[0].clientX;
	touchEndX = touchStartX; // Initialise end position to match start
}

// Handle touch move event
function handleTouchMove(event) {
	if (!isTouching) return;

	touchEndX = event.touches[0].clientX;

	// Prevent default behavior (page scroll) when swiping on the image
	if (Math.abs(touchEndX - touchStartX) > 11) {
		event.preventDefault();
	}
}

// Handle touch end event
function handleTouchEnd(event) {
	if (!isTouching) return;

	const minSwipeDistance = 100;
	const swipeDistance = touchEndX - touchStartX;

	if (Math.abs(swipeDistance) < minSwipeDistance) {
	} else {
		if (swipeDistance > 0) {
			prevBtn.click();
		} else {
			nextBtn.click();
		}
	}

	// Reset touch state
	resetTouchState();
}

// Handle touch cancel event
function handleTouchCancel() {
	resetTouchState();
}

// Reset touch tracking state
function resetTouchState() {
	isTouching = false;
	touchStartX = 0;
	touchEndX = 0;
}

// Also reset touch state when lightbox closes
popup.addEventListener("click", (e) => {
	if (e.target === popup) {
		popup.classList.remove("show");
		document.body.classList.remove("disable-scroll");
		resetTouchState(); // Reset touch state when lightbox closes
	}
});

// Add keyboard support (optional enhancement)
document.addEventListener("keydown", (e) => {
	if (popup.classList.contains("show")) {
		if (e.key === "Escape") {
			popup.classList.remove("show");
			document.body.classList.remove("disable-scroll");
		} else if (e.key === "ArrowLeft") {
			prevBtn.click();
		} else if (e.key === "ArrowRight") {
			nextBtn.click();
		}
	}
});

// Add accessibility enhancements
popupImage.setAttribute("role", "img");
popup.setAttribute("role", "dialog");
popup.setAttribute("aria-modal", "true");
popup.setAttribute("aria-label", "Image lightbox");
prevBtn.setAttribute("aria-label", "Previous image");
nextBtn.setAttribute("aria-label", "Next image");

// Disable right-click on images for basic prevention of downloading
document.addEventListener("contextmenu", (e) => {
	if (e.target.tagName === "IMG") {
		e.preventDefault();
		alert("Right-click is disabled on images");
		return false;
	}
});

//HEART ICONS//
const heartIcons = document.querySelectorAll(".heart-icon");

heartIcons.forEach((heart) => {
	heart.addEventListener("click", function (e) {
		// Prevent event bubbling
		e.stopPropagation();

		// Toggle the liked class
		this.classList.toggle("liked");
	});
});
