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
}, 3000);

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
const headerSection = document.querySelector(".header");

const aboutSection = document.querySelector("#more");
if (window.screen.width >= 600) {
  //CURSOR
  window.addEventListener("mousemove", (e) => {
    document.body.style = `--move-x: ${e.clientX}px; --move-y: ${e.clientY}px`;
  });

  const cursor = document.querySelector(".cursor");
  const cursorImg = document.querySelector(".cursor__img");

  window.addEventListener("mousemove", (e) => {
    if (
      e.target.parentElement.dataset.cursor ||
      e.target.dataset.cursor
      //e.target.classList.contains("services__row") ||
      //e.target.parentElement.classList.contains("services__row")
    ) {
      // console.log(e.target.closest(".services__row").dataset.cursor);
      cursor.classList.add("visible");
      cursorImg.className = `${
        e.target.dataset.cursor
          ? e.target.dataset.cursor
          : e.target.parentElement.dataset.cursor
        // e.target.closest(".services__row").dataset.cursor
      }`;
    } else {
      cursor.classList.remove("visible");
    }
  });

  //MOVING VISIT CARD ANIMTAION

  aboveHeight = headerSection.offsetHeight;
  ax = aboutSection.offsetWidth / 2;
  ay = aboutSection.offsetHeight / 2;

  aboutSection.addEventListener("mousemove", (e) => {
    clientX = e.pageX;
    clientY = e.pageY - aboveHeight;

    request = requestAnimationFrame(updateMe);

    function updateMe() {
      let dx = clientX - ax;
      let dy = clientY - ay;
      tiltx = dy / ay;
      tilty = dx / ax;
      radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
      degree = radius * 15;
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
const animItems = document.querySelectorAll(".animated-item");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        window.scrollY > animItemOffset - animItemPoint &&
        window.scrollY < animItemOffset + animItemPoint
      ) {
        animItem.classList.add("animated");
      } else {
        animItem.classList.remove("animated");
      }

      // animItemPoint = window.innerHeight - animItemHeight;
      // if (animItemHeight > window.innerHeight) {
      //   animItemPoint = window.innerHeight - window.innerHeight;
      // }

      // if (
      //   window.scrollY > animItemOffset - animItemPoint &&
      //   window.scrollY < animItemOffset + animItemHeight / 8
      // ) {
      //   animItem.classList.add("active");
      // } else {
      //   animItem.classList.remove("active");
      // }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollX || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
}

setTimeout(() => {
  animOnScroll();
}, 300);
