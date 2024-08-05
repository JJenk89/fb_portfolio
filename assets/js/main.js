//Init app
//Lightboxes
//Carousel
//Burger
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const cross = document.getElementById("cross");

burger.addEventListener("click", () => {
	console.log("burger clicked");
	menu.classList.remove("hidden");
	cross.classList.remove("hidden");
	burger.classList.toggle("hidden");
});

cross.addEventListener("click", () => {
	cross.classList.toggle("hidden");
	menu.classList.toggle("hidden");
	burger.classList.toggle("hidden");
});
