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
	// Update grid images
	const width = window.innerWidth;
	const images = document.querySelectorAll(".grid img");

	// Only update grid images (lightbox will always use _md)
	images.forEach((img) => {
		const src = img.getAttribute("src");
		if (width >= 599) {
			img.setAttribute("src", src.replace("_sm", "_md"));
		} else {
			img.setAttribute("src", src.replace("_md", "_sm"));
		}
	});
}

window.addEventListener("resize", updateSource);
window.addEventListener("load", updateSource);

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

		// Track the heart click event
		trackHeartClick(this.classList.contains("liked"), imageId, img);
	});
});

function getUniqueImageId(imgElement) {
	if (imgElement.hasAttribute("data-image-id")) {
		return imgElement.getAttribute("data-image-id");
	}

	// If no data-image-id, create a unique ID based on the gallery and filename
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

function trackHeartClick(isLiked, imageId, imgElement) {
	// Only proceed if analytics consent was given
	if (localStorage.getItem("analyticsConsent") !== "true") return;

	// Check if gtag is loaded
	if (typeof gtag === "undefined") return;

	// Get additional information about the image
	const galleryName = imgElement.getAttribute("data-gallery") || "default";
	const imageSrc = imgElement.getAttribute("src");
	const imageAlt = imgElement.getAttribute("alt") || "No description";

	// Send the event to Google Analytics
	gtag("event", "heart_click", {
		event_category: "Gallery Interaction",
		event_label: galleryName,
		value: isLiked ? 1 : 0, // 1 for liked, 0 for unliked
		image_id: imageId,
		image_src: imageSrc,
		image_alt: imageAlt,
		gallery_name: galleryName,
	});
}
