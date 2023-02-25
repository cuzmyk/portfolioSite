//MENU BTN
const menuBtn = document.getElementById("menu-btn");
const menu = document.querySelector(".menu");

menuBtn.onclick = () => {
  menuBtn.dataset.state === "closed"
    ? ((menuBtn.dataset.state = "opened"), (menu.dataset.state = "opened"))
    : ((menuBtn.dataset.state = "closed"), (menu.dataset.state = "closed"));
};

//HORIZONTAL SCROLL
const container = document.querySelector(".scroll-wrapper");
const sections = gsap.utils.toArray(".scroll-wrapper section");

let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".scroll-wrapper",
    pin: true,
    scrub: 1,
    snap: {
      snapTo: 1 / (sections.length - 1),
      duration: { min: 0.1, max: 1 },
      delay: 0,
    },
    end: () => "+=" + container.offsetWidth,
  },
});

//HERO LOGO ANIMATION
const wrapper = document.querySelector("#wrapper");
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const uniqueRand = (min, max, prev) => {
  let next = prev;
  while (prev === next) next = rand(min, max);
  return next;
};

const combinations = [
  { configuration: 1, roundness: 1 },
  { configuration: 1, roundness: 2 },
  { configuration: 1, roundness: 3 },
  { configuration: 2, roundness: 2 },
  { configuration: 2, roundness: 3 },
  { configuration: 3, roundness: 1 },
  { configuration: 3, roundness: 4 },
];

let prev = 0;

setInterval(() => {
  const i = uniqueRand(0, combinations.length - 1, prev);
  let combination = combinations[i];

  wrapper.dataset.configuration = combination.configuration;
  wrapper.dataset.roundness = combination.roundness;
  prev = i;
}, 2000);

//SCROLL TO ANCHOR BUTTON
const anchors = document.querySelectorAll('a[href^="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const goto = anchor.hasAttribute("href")
      ? anchor.getAttribute("href")
      : "body";

    document.querySelector(goto).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

//CARD ANIMATION
const headerSection = document.querySelector(".hero__greeting");
const aboutSection = document.querySelector("#more");
if (window.screen.width >= 600) {
  ax = window.innerWidth / 2;
  ay = window.innerHeight / 2;

  aboutSection.addEventListener("mousemove", (e) => {
    clientX = e.pageX;
    clientY = e.pageY;

    request = requestAnimationFrame(updateMe);

    function updateMe() {
      let dx = clientX - ax;
      let dy = clientY - ay;
      tiltx = dy / ay - 1;
      tilty = dx / ax;
      radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
      degree = radius * 12;
      gsap.to(".card", 1, {
        transform: `rotate3d(${-tiltx + 0.9},${tilty},0,${degree}deg)`,
      });
    }
  });
}

//CIRCLE TEXT ANIMATION
const circleText = document.querySelectorAll(".circle__text h4");
circleText.forEach((e) => {
  e.innerHTML = e.innerText
    .split("")
    .map(
      (char, i) => `<span style="transform:rotate(${i * 20}deg)">${char}</span>`
    )
    .join("");
});

//CUBE ANIMATION
const serviceItems = document.querySelectorAll(".services__item");
const cube = document.querySelector(".cube");

serviceItems.forEach((e) => {
  e.addEventListener("mouseover", () => {
    cube.dataset.side = e.dataset.side;
  });
  e.addEventListener("mouseout", () => {
    cube.removeAttribute("data-side");
  });
});
//PATH TEXT ANIMATION
const textPath = document.querySelector("#text-path");
function updateTextPathOffset(offset) {
  textPath.setAttribute("startOffset", offset);
}

function onScroll() {
  requestAnimationFrame(function () {
    updateTextPathOffset(
      window.scrollY - aboutSection.offsetHeight - headerSection.offsetHeight
    );
  });
}

window.addEventListener("scroll", onScroll);

//SLIDER

const slides = Array.from(document.querySelectorAll(".slide__img"));
const slidesInfo = Array.from(document.querySelectorAll(".slide__info"));
const slidesList = Array.from(document.querySelectorAll(".projects__list h5"));
const sliderInfoWrapper = document.querySelector(".slider__info-wrapper");
const prevSlideBtn = document.getElementById("prev-btn");
const nextSlideBtn = document.getElementById("next-btn");

let activeIndex = 0;
nextSlideBtn.onclick = () => {
  const nextIndex = activeIndex + 1 <= slides.length - 1 ? activeIndex + 1 : 0;
  const currentSlide = activeIndex,
    nextSlide = nextIndex,
    commingSlide = nextIndex + 1 <= slides.length - 1 ? nextIndex + 1 : 0;

  slides[currentSlide].dataset.status = "prev-slide";
  slides[nextSlide].dataset.status = "curr-slide";
  slides[commingSlide].dataset.status = "next-slide";
  // sliderInfoWrapper.style.transform = `translateX(${nextIndex * -100}vh)`;
  slidesInfo[currentSlide].dataset.status = "prev-slide";
  slidesInfo[nextSlide].dataset.status = "curr-slide";
  slidesInfo[commingSlide].dataset.status = "next-slide";
  // slidesList[currentSlide].removeAttribute("data-status");
  // slidesList[nextSlide].dataset.status = "curr-slide";
  slides.forEach((e) => {
    if (
      e !== slides[currentSlide] &&
      e !== slides[nextSlide] &&
      e !== slides[commingSlide]
    ) {
      e.dataset.status = "hidden-slide";
    }
  });
  activeIndex = nextIndex;
};

prevSlideBtn.onclick = () => {
  const prevIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1;
  // console.log(prevIndex);
  const currentSlide = activeIndex,
    prevSlide = prevIndex,
    commingSlide = prevIndex - 1 >= 0 ? prevIndex - 1 : slides.length - 1;
  // console.log(prevSlide);
  slides[currentSlide].dataset.status = "next-slide";
  slides[prevSlide].dataset.status = "curr-slide";
  slides[commingSlide].dataset.status = "prev-slide";
  slidesInfo[currentSlide].dataset.status = "next-slide";
  slidesInfo[prevSlide].dataset.status = "curr-slide";
  slidesInfo[commingSlide].dataset.status = "prev-slide";
  // slidesList[currentSlide].removeAttribute("data-status");
  // slidesList[prevSlide].dataset.status = "curr-slide";
  slides.forEach((e) => {
    if (
      e !== slides[currentSlide] &&
      e !== slides[prevSlide] &&
      e !== slides[commingSlide]
    ) {
      e.dataset.status = "hidden-slide";
    }
  });
  activeIndex = prevIndex;
};
