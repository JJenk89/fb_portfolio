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
		resetTouchState();
	}
});

//  keyboard support
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

// accessibility enhancements
popupImage.setAttribute("role", "img");
popup.setAttribute("role", "dialog");
popup.setAttribute("aria-modal", "true");
popup.setAttribute("aria-label", "Image lightbox");
prevBtn.setAttribute("aria-label", "Previous image");
nextBtn.setAttribute("aria-label", "Next image");
