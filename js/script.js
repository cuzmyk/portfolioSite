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
hx = headerSection.offsetWidth / 2;
hy = headerSection.offsetHeight / 2;

headerSection.addEventListener("mousemove", (e) => {
  clientX = e.pageX;

  request = requestAnimationFrame(moveWave);
  function moveWave() {
    let dx = clientX - hx;

    tiltx = (dx / hx) * 23;

    gsap.to(".hero__wave-1", 1, {
      transform: `translate(${-tiltx / 2 - 50}% ,0)`,
    });
    if (tiltx <= 30 || tiltx >= -50) {
      gsap.to(".hero__wave-2", 1, {
        transform: `translate(${-tiltx - 50}%,0)`,
      });
    }
  }
});

console.log(window.screen.width);
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

//PARALLAX EFFECT ON HEADER WAVE
const wave = document.querySelector(".parallax-wave");
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  if (value <= 800) {
    wave.style.transform = `translateY(${400 - value / 2}px)`;
  }
});

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
