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

// https://mash-up.kr/에서 볼 수 있는 카드가 왼쪽으로 무한 이동하는 연출은 스와이퍼가 아니라고 생각합니다.

// 스와이퍼는 내부적으로 transition 을 이용해서 구현합니다.

// hover시 멈추는 기능은, 즉 pause나 stop같은 기능은 transition에 없습니다.
// 스와이퍼에서 지원하는 stop은 카드 단위로 transition이 끝나면 멈춥니다.
// 따라서 즉시 중지가 불가능합니다.

// 즉시 중지 기능은 animation에 있어서 animation으로 구현해야 한다고 생각합니다.
// 혹은, marquee요소를 사용해서 구현해야 한다는 생각이 듭니다.(test 해 봐야 합니다.)

// 구글링으로 안 것은, 스와이퍼로 호버시 즉시 멈춤을 구현하는 기능은 알아서 구현해야 합니다.
// reference: https://stackoverflow.com/questions/77023946/how-to-stop-autoplay-in-swiper-immediately-on-hover

// 컴포넌트 완성은 이미 했고, 무한 자동 슬라이드를 스와이퍼로 구현한 것은 남긴 채로 push하겠습니다.
