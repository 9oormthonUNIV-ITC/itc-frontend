/**
* 메인페이지 섹션4 : 경인지부일정/ Slide
*/

const slideList = document.querySelectorAll('ul.card-slider-list > li');
const prevBtn = document.querySelector('.slider-btn.left');
const nextBtn = document.querySelector('.slider-btn.right');

let currentIndex = 0;

// Slide 함수 설정
function showSlide(index) {
  slideList.forEach((item) => {
    item.classList.add('hidden');
  });

  slideList[index].classList.remove('hidden');
}

showSlide(currentIndex);

// 이전 버튼 클릭 이벤트
prevBtn.addEventListener('click', function () {
  currentIndex = (currentIndex - 1 + slideList.length) % slideList.length;
  showSlide(currentIndex);
});

// 다음 버튼 클릭 이벤트
nextBtn.addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % slideList.length;
  showSlide(currentIndex);
});
