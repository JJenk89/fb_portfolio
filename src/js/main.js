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
restoreLikedStates(); // Restore liked states on page load

heartIcons.forEach((heart) => {
	heart.addEventListener("click", function (e) {
		// Prevent event bubbling
		e.stopPropagation();

		// Toggle the liked class
		this.classList.toggle("liked");

		// Find the parent container and get the image
		const container = this.closest(".heart-container").parentElement;
		const img = container.querySelector("img");

		// Get unique ID from data attribute or create one if not present
		let imageId = getUniqueImageId(img);

		// Save to localStorage based on current state
		if (this.classList.contains("liked")) {
			localStorage.setItem("liked-" + imageId, "true");
		} else {
			localStorage.removeItem("liked-" + imageId);
		}
	});
});

function getUniqueImageId(imgElement) {
	// First check if we have a data-image-id attribute
	if (imgElement.hasAttribute("data-image-id")) {
		return imgElement.getAttribute("data-image-id");
	}

	// If not, create one using gallery name (if available) and src
	let gallery = imgElement.hasAttribute("data-gallery")
		? imgElement.getAttribute("data-gallery")
		: "gallery";

	// Get the filename from the src
	let filename = imgElement.getAttribute("src").split("/").pop();

	// Combine gallery and filename for uniqueness
	return gallery + "-" + filename;
}

function restoreLikedStates() {
	// Get all images that have the data attributes we use for tracking likes
	const images = document.querySelectorAll(
		"img[data-gallery][data-image-id]"
	);

	images.forEach((img) => {
		// Get the unique ID for this image
		const imageId = getUniqueImageId(img);

		// Check if this image is liked in localStorage
		if (localStorage.getItem("liked-" + imageId) === "true") {
			// Find the container and heart icon
			const container = img.parentElement;
			const heartIcon = container.querySelector(".heart-icon");

			if (heartIcon) {
				heartIcon.classList.add("liked");
			}
		}
	});
}

//Palette switcher//

// Wait for DOM to be fully loaded
console.log("Palette script starting...");

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM loaded - checking for palette elements");

	const paletteContainer = document.getElementById("palette-container");
	console.log("Palette container found:", Boolean(paletteContainer));

	if (!paletteContainer) {
		console.error(
			"Palette container is null - check your HTML for id='palette-container'"
		);
		// Try to find by class as fallback
		const containerByClass = document.querySelector(".palette-wrapper");
		console.log("Found by class instead:", Boolean(containerByClass));

		if (containerByClass) {
			console.log("Adding ID to container");
			containerByClass.id = "palette-container";
		}
	}

	// Try again after potential fix
	const container =
		document.getElementById("palette-container") ||
		document.querySelector(".palette-wrapper");

	if (container) {
		console.log("Working with container:", container);
		const paletteGroups = document.querySelectorAll(".palette-group");
		console.log("Found palette groups:", paletteGroups.length);

		// Add direct click handlers to each palette
		document.querySelectorAll(".palette").forEach((palette, index) => {
			console.log("Adding click handler to palette", index);

			palette.addEventListener("click", function (e) {
				console.log("Direct palette click on", index);
				e.stopPropagation();

				// Toggle between groups
				paletteGroups.forEach((group) => {
					group.classList.toggle("active");
				});
			});
		});

		// Also add container level delegation as backup
		container.addEventListener("click", function (event) {
			console.log("Container clicked at", event.clientX, event.clientY);

			const palette = event.target.closest(".palette");
			if (palette) {
				console.log("Found palette via delegation");

				paletteGroups.forEach((group) => {
					group.classList.toggle("active");
				});
			} else {
				console.log("Click did not hit a palette element");
			}
		});
	} else {
		console.error("Could not find palette container by any means!");
	}
});
