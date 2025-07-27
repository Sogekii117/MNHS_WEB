const toggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const logo = document.getElementById("logo");
const body = document.body;
toggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  logo.classList.toggle("centered");
});
  // Find all dropdown buttons
document.querySelectorAll('.drop-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent event bubbling

    const dropdown = this.parentElement;
    dropdown.classList.toggle('show');

    // Close others if needed
    document.querySelectorAll('.Dropdown').forEach(d => {
      if (d !== dropdown) d.classList.remove('show');
    });
  });
});

// Close dropdown if clicked outside
window.addEventListener('click', () => {
  document.querySelectorAll('.Dropdown').forEach(d => {
    d.classList.remove('show');
  });
});

/*disable scroll when hamburger menu is shwon*/ 
toggle.addEventListener('click', () => {
	navMenu.classList.toggle('open');       // toggle menu visibility
	body.classList.toggle('no-scroll');     // disable/enable scroll
  });

/* ===strands ===*/
const Strands = [
	{ Abreveation: "Stem", name: "Science Technology Engineering Math" },
	{ Abreveation: "HE", name: "Home Economics" },
	{ Abreveation: "ABM", name: "Accountancy, Business, Management" },
	{ Abreveation: "GAS", name: "General Academic Strand" },
	{ Abreveation: "ICT", name: "Information Communication Technology" },
	{ Abreveation: "James Wilson", name: "Product Manager" }
];

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const StrandAbrveation = document.querySelector(".Strand-Abrveation");
const StrandName = document.querySelector(".Strand-name");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentIndex = (newIndex + cards.length) % cards.length;

	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

		if (offset === 0) {
			card.classList.add("center");
		} else if (offset === 1) {
			card.classList.add("right-1");
		} else if (offset === 2) {
			card.classList.add("right-2");
		} else if (offset === cards.length - 1) {
			card.classList.add("left-1");
		} else if (offset === cards.length - 2) {
			card.classList.add("left-2");
		} else {
			card.classList.add("hidden");
		}
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	StrandAbrveation.style.opacity = "0";
	StrandAbrveation.style.opacity = "0";

	setTimeout(() => {
		StrandAbrveation.textContent = Strands[currentIndex].Abreveation;
		StrandName.textContent = Strands[currentIndex].name;
		StrandAbrveation.style.opacity = "1";
		StrandAbrveation.style.opacity = "1";
	}, 300);

	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

leftArrow.addEventListener("click", () => {
	updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
	updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => {
		updateCarousel(i);
	});
});

cards.forEach((card, i) => {
	card.addEventListener("click", () => {
		updateCarousel(i);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentIndex - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentIndex + 1);
	}
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			updateCarousel(currentIndex + 1);
		} else {
			updateCarousel(currentIndex - 1);
		}
	}
}

updateCarousel(0);


