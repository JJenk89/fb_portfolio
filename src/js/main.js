//Lightboxes
//Carousel

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

//IMG POPUP
const images = document.querySelectorAll(".flowers-grid img");
const popupImage = document.querySelector(".popup img");
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
