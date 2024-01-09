/* Preload */
let preload = document.querySelector(".preload");

window.addEventListener("load", () => {
  let loadTimeout = setTimeout(() => {
    preload.classList.add("loadend");
    document.body.classList.add("loaded");
    clearTimeout(loadTimeout);
  }, 1000);
});

/* Header toggles */
let btnOpen = document.querySelector(".nav-open-btn");
let navbar = document.querySelector(".navbar");
let btnClose = document.querySelector(".close-btn");
let overlay = document.querySelector(".overlay");
let header = document.querySelector("[data-header]");

btnOpen.addEventListener("click", function () {
  navbar.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("nav-active");
});

btnClose.addEventListener("click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});

window.addEventListener("scroll", function () {
  if (this.scrollY >= 50) {
    header.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
  }
});

let scrollBottom = 0;

let hideHeader = () => {
  if (scrollBottom < window.scrollY) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  scrollBottom = window.scrollY;
};

/* Navbar links */

let navLinks = document.querySelectorAll(".navbar-link");
navLinks.forEach((link) => {
  // Trigger Button Close And Add Active Class
  link.addEventListener("click", () => {
    btnClose.click();
  });
});

/* Add Active Class In Scroll */
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(".navbar-item a[href*=" + sectionId + "]");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active");
    } else {
      sectionsClass.classList.remove("active");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/* Hero Swiper */

// Auto Swiper
let heroSliders = document.querySelectorAll("[data-hero-slider-item]");
let count = 0,
  activeSlider;

function sliders() {
  clearInterval(activeSlider);
  activeSlider = setInterval(() => {
    count += 1;
    if (count === 3) {
      count = 0;
    }
    heroSliders.forEach((silder) => {
      silder.classList.remove("active");
    });
    heroSliders[count].classList.add("active");
  }, 7000);
}
sliders();

// Manual Swiper
let btnPrev = document.querySelector("[data-btn-prev]");
let btnNext = document.querySelector("[data-btn-next]");

btnPrev.addEventListener("click", () => {
  heroSliders.forEach((item) => {
    item.classList.remove("active");
  });
  count -= 1;
  if (count === -1) {
    count = 2;
  }
  heroSliders[count].classList.add("active");
  sliders();
});

btnNext.addEventListener("click", () => {
  heroSliders.forEach((item) => {
    item.classList.remove("active");
  });
  count += 1;
  if (count === 3) {
    count = 0;
  }
  heroSliders[count].classList.add("active");
  sliders();
});

/* Parallax effect */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x,
  y,
  len = parallaxItems.length;

window.addEventListener("mousemove", (event) => {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  x = -x;
  y = -y;

  for (let i = 0; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});

/* Back to top btn */
let backTop = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  this.scrollY >= 50 ? backTop.classList.add("active") : backTop.classList.remove("active");
});

/* Set Default Value To Date Input */
document.querySelector(".date-input").valueAsDate = new Date();

/* Flatpiker */
flatpickr(".date-input", { disableMobile: "true" });
