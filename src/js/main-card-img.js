const mySwiper = new Swiper(".main-card-swiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 0,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
  },
  speed: 3000,
});

const main_card_swiper = document.querySelector(".main-card-swiper");
main_card_swiper.addEventListener("mouseover", stopCardSwiper);
main_card_swiper.addEventListener("mouseout", startCardSwiper);
function stopCardSwiper() {
  mySwiper.autoplay.stop();
}
function startCardSwiper() {
  mySwiper.autoplay.start();
}
