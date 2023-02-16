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

//MOVING WAVES ANIMATION
const headerSection = document.querySelector(".hero__greeting");

const aboutSection = document.querySelector("#more");
if (window.screen.width >= 600) {
  //CURSOR
  // window.addEventListener("mousemove", (e) => {
  //   document.body.style = `--move-x: ${e.clientX}px; --move-y: ${e.clientY}px`;
  // });

  // const cursor = document.querySelector(".cursor");
  // const cursorImg = document.querySelector(".cursor__img");

  // window.addEventListener("mousemove", (e) => {
  //   if (
  //     e.target.parentElement.dataset.cursor ||
  //     e.target.dataset.cursor
  //   ) {

  //     cursor.classList.add("visible");
  //     cursorImg.className = `${
  //       e.target.dataset.cursor
  //         ? e.target.dataset.cursor
  //         : e.target.parentElement.dataset.cursor
  //     }`;
  //   } else {
  //     cursor.classList.remove("visible");
  //   }
  // });

  //MOVING VISIT CARD ANIMTAION

  // ax = aboutSection.offsetWidth / 2;
  // ay = aboutSection.offsetHeight / 2;
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
        transform: `rotate3d(${-tiltx},${tilty},0,${degree}deg)`,
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

//ANIMATION ON SCROLL
// const animItems = document.querySelectorAll(".animated-item");

// if (animItems.length > 0) {
//   window.addEventListener("scroll", animOnScroll);
//   function animOnScroll() {
//     for (let index = 0; index < animItems.length; index++) {
//       const animItem = animItems[index];
//       const animItemHeight = animItem.offsetHeight;
//       const animItemOffset = offset(animItem).top;
//       const animStart = 4;

//       let animItemPoint = window.innerHeight - animItemHeight / animStart;
//       if (animItemHeight > window.innerHeight) {
//         animItemPoint = window.innerHeight - window.innerHeight / animStart;
//       }

//       if (
//         window.scrollY > animItemOffset - animItemPoint &&
//         window.scrollY < animItemOffset + animItemPoint
//       ) {
//         animItem.classList.add("animated");
//       } else {
//         animItem.classList.remove("animated");
//       }

//       // animItemPoint = window.innerHeight - animItemHeight;
//       // if (animItemHeight > window.innerHeight) {
//       //   animItemPoint = window.innerHeight - window.innerHeight;
//       // }

//       // if (
//       //   window.scrollY > animItemOffset - animItemPoint &&
//       //   window.scrollY < animItemOffset + animItemHeight / 8
//       // ) {
//       //   animItem.classList.add("active");
//       // } else {
//       //   animItem.classList.remove("active");
//       // }
//     }
//   }
//   function offset(el) {
//     const rect = el.getBoundingClientRect(),
//       scrollLeft = window.scrollX || document.documentElement.scrollLeft,
//       scrollTop = window.scrollY || document.documentElement.scrollTop;
//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
//   }
// }

// setTimeout(() => {
//   animOnScroll();
// }, 300);

const slides = Array.from(document.querySelectorAll(".slide__img"));
const prevSlideBtn = document.getElementById("prev-btn");
const nextSlideBtn = document.getElementById("next-btn");
console.log(slides);

let activeIndex = 0;
nextSlideBtn.onclick = () => {
  const nextIndex = activeIndex + 1 <= slides.length - 1 ? activeIndex + 1 : 0;

  const currentSlide = slides[activeIndex],
    nextSlide = slides[nextIndex],
    commingSlide =
      nextIndex + 1 <= slides.length - 1 ? slides[nextIndex + 1] : slides[0];

  currentSlide.dataset.status = "prev-slide";
  nextSlide.dataset.status = "curr-slide";
  commingSlide.dataset.status = "next-slide";
  slides.forEach((e) => {
    if (e !== currentSlide && e !== nextSlide && e !== commingSlide) {
      e.dataset.status = "hidden-slide";
    }
  });
  activeIndex = nextIndex;
};
prevSlideBtn.onclick = () => {
  const prevIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1;
  // console.log(prevIndex);
  const currentSlide = slides[activeIndex],
    prevSlide = slides[prevIndex],
    commingSlide =
      prevIndex - 1 >= 0 ? slides[prevIndex - 1] : slides[slides.length - 1];
  // console.log(prevSlide);
  currentSlide.dataset.status = "next-slide";
  prevSlide.dataset.status = "curr-slide";
  commingSlide.dataset.status = "prev-slide";
  slides.forEach((e) => {
    if (e !== currentSlide && e !== prevSlide && e !== commingSlide) {
      e.dataset.status = "hidden-slide";
    }
  });
  activeIndex = prevIndex;
};
