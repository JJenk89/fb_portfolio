// JS file for Google Analytics (gtag.js, G4A)
// This file is used to track user interactions and events on the website
// using Google Analytics. It includes functions to track page views, button clicks, and other events.
// It specifically tracks clicks on the "heart" buuttons

// Check for consent
function loadGoogleAnalytics() {
	if (localStorage.getItem("analyticsConsent") === "true") {
		// Load Google Analytics script
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag("js", new Date());

		gtag("config", "G-397DD95GZF");

		// Add the GA script
		const script = document.createElement("script");
		script.async = true;
		script.src = "https://www.googletagmanager.com/gtag/js?id=G-397DD95GZF";
		document.head.appendChild(script);
	}
}

// Initialise consent banner
document.addEventListener("DOMContentLoaded", function () {
	const consentBanner = document.getElementById("consent-banner");
	const acceptBtn = document.getElementById("accept-consent");
	const declineBtn = document.getElementById("decline-consent");

	// Only show banner if no consent decision has been made
	if (!localStorage.getItem("analyticsConsent")) {
		consentBanner.classList.remove("hidden");
		document.body.classList.add("disable-scroll");
	}

	// Handle consent acceptance
	acceptBtn.addEventListener("click", function () {
		localStorage.setItem("analyticsConsent", "true");
		consentBanner.classList.add("hidden");
		document.body.classList.remove("disable-scroll");
		loadGoogleAnalytics();
	});

	// Handle consent decline
	declineBtn.addEventListener("click", function () {
		localStorage.setItem("analyticsConsent", "false");
		document.body.classList.remove("disable-scroll");
		consentBanner.classList.add("hidden");
	});

	// Load GA if already consented
	loadGoogleAnalytics();
});
