// JS file for Google Analytics (gtag.js, G4A)
// This file is used to track user interactions and events on the website
// using Google Analytics. It includes functions to track page views, button clicks, and other events.
// It specifically tracks clicks on the "heart" buuttons

// Check for consent
function loadGoogleAnalytics() {
	// Check if analytics script is already loaded (avoid duplicate loading)
	if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
		return;
	}

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

		// Add error handling
		script.onerror = function () {
			console.error("Failed to load Google Analytics script");
		};

		document.head.appendChild(script);
	}
}

// Main execution
document.addEventListener("DOMContentLoaded", function () {
	// Check if we're on the homepage
	const isHomepage =
		window.location.pathname === "/" ||
		window.location.pathname === "/index.html";

	// Only setup consent banner if we're on the homepage
	if (isHomepage) {
		const consentBanner = document.getElementById("consent-banner");
		const acceptBtn = document.getElementById("accept-consent");
		const declineBtn = document.getElementById("decline-consent");

		// Only show consent banner if no decision has been made yet
		if (consentBanner && !localStorage.getItem("analyticsConsent")) {
			consentBanner.classList.remove("hidden");
		}

		// Handle consent acceptance
		if (acceptBtn) {
			acceptBtn.addEventListener("click", function () {
				localStorage.setItem("analyticsConsent", "true");
				consentBanner.classList.add("hidden");
				loadGoogleAnalytics(); // Load GA immediately after consent
			});
		}

		// Handle consent decline
		if (declineBtn) {
			declineBtn.addEventListener("click", function () {
				localStorage.setItem("analyticsConsent", "false");
				consentBanner.classList.add("hidden");
			});
		}
	}

	// Always try to load Google Analytics on every page if consent was given
	loadGoogleAnalytics();
});
