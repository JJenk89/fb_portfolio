document.addEventListener("DOMContentLoaded", function () {
	const paletteContainer =
		document.getElementById("palette-container") ||
		document.querySelector(".palette-wrapper");

	if (paletteContainer) {
		const paletteGroups = Array.from(
			document.querySelectorAll(".palette-group")
		);
		let currentIndex = 0;

		// Initialise the first group as active
		paletteGroups.forEach((group, index) => {
			group.classList.toggle("active", index === 0);
		});

		function cyclePalettes() {
			// Disable interactions during transition
			paletteContainer.style.pointerEvents = "none";

			// Deactivate current group
			paletteGroups[currentIndex].classList.remove("active");

			// Calculate next index (cycles through 0, 1, 2, etc.)
			currentIndex = (currentIndex + 1) % paletteGroups.length;

			// Activate next group
			paletteGroups[currentIndex].classList.add("active");

			// Re-enable after transition completes
			setTimeout(() => {
				paletteContainer.style.pointerEvents = "auto";
			}, 500); // Matches CSS transition duration
		}

		// Add click handlers to each palette
		document.querySelectorAll(".palette").forEach((palette) => {
			palette.addEventListener("click", function (e) {
				e.stopPropagation();
				cyclePalettes();
			});
		});

		// Container level delegation as backup
		paletteContainer.addEventListener("click", function (event) {
			const palette = event.target.closest(".palette");
			if (palette) {
				cyclePalettes();
			}
		});
	}
});
