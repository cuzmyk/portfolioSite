// import Swiper from "swiper";
// import "swiper/css";

document.addEventListener("DOMContentLoaded", () => {
  const swiperImg = new Swiper(".projects__img", {
    loop: false,
    speed: 1500,
    parallax: true,
    navigation: {
      nextEl: ".project__btn.right",
      prevEl: ".project__btn.left",
    },
  });
});
// let slider = new Swiper(".projects__slider", {
//   loop: true,

//   centeredSlides: true,
//   slidesPerView: 2.07,
//   spaceBetween: 30,
//   slideToClickedSlide: true,
//   parallax: true,

//   effect: "slide",
//   //   'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
//   // grabCursor: true,
//   speed: 500,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     type: "bullets",
//     clickable: true,
//   },
// });
