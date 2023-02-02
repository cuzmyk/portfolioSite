  const swiperImg = new Swiper(".projects__img", {
    loop: false,
    speed: 1500,
    slidesPerView: 1,
    parallax: true,
    grabCursor: true,
    navigation: {
      nextEl: ".project__btn.right",
      prevEl: ".project__btn.left",
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    }, 
  });
  const swiperInfo = new Swiper(".projects__info", {
    loop: false,
    speed: 1500,
    slidesPerView: 1,
    allowTouchMove: false,
    direction: 'vertical',
  
  });
  
  swiperImg.controller.control = swiperInfo
  swiperInfo.controller.control = swiperImg
 
 
