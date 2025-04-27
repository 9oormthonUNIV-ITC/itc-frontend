/**
 * 메인페이지 휠 이벤트 함수
 */

// 스크롤 상태 관리
let scrollStatus = false; // 스크롤 중인지 여부
let sections = []; // main > section 요소 배열
let lastSectionScrollable = true; // 마지막 섹션 내 스크롤 허용 여부

// main > section 요소
sections = [
  document.querySelector('#mainSection01'),
  document.querySelector('#mainSection02'),
  document.querySelector('#mainSection03'),
  document.querySelector('#mainSection04'),
  document.querySelector('#mainSection05'),
];

// 더 알아보기 버튼 요소
const moreButton = document.querySelector('a[href="#mainSection02"]');

// "더 알아보기" 버튼 클릭 시, 두 번째 섹션으로 스크롤 이동
if (moreButton) {
  moreButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (scrollStatus) return; // 스크롤 중이면 클릭 무시

    const targetElement = document.querySelector('#mainSection02');
    if (targetElement) {
      scrollToElement(targetElement);
    }
  });
}

// 초기 프로그레스 바 상태 설정
updateProgressBar();

/**
 * 프로그레스바 업데이트
 */
function updateProgressBar() {
  const progressBar = document.querySelector('div.progress-bar');
  if (!progressBar) return;

  const scrollPosition = window.scrollY;
  let currentSectionIndex = 0;

  // 현재 활성화된 섹션 인덱스 찾기
  sections.forEach((section, index) => {
    if (section && scrollPosition >= section.offsetTop - 200) {
      currentSectionIndex = index;
    }
  });

  // 섹션당 20% 비율로 진행률 계산
  const progressPercent = (currentSectionIndex + 1) * 20;

  // 프로그레스 바 너비 설정
  progressBar.style.width = `${progressPercent}%`;
}

// 스크롤 이벤트 발생 시 프로그레스 바 업데이트
window.addEventListener('scroll', updateProgressBar);

/**
 * 휠 이벤트
 * @param {HTMLElement} element 이동할 대상 요소
 */
function scrollToElement(element) {
  if (!element) return;

  scrollStatus = true; // 스크롤 중 상태로 변경

  window.scrollTo({
    top: element.offsetTop,
    behavior: 'smooth',
  });

  // 스크롤 애니메이션 후 프로그레스바
  setTimeout(() => {
    updateProgressBar();
    scrollStatus = false;
  }, 500);
}

/**
 * 현재 뷰포트가 마지막 섹션에 위치하는지 확인 // 마지막섹션 푸터-스크롤 허용
 * @returns {boolean} 마지막 섹션에 있으면 true
 */
function isInLastSection() {
  const scrollPosition = window.scrollY;
  const lastSectionIndex = sections.length - 1;

  if (lastSectionIndex < 0 || !sections[lastSectionIndex]) return false;

  const lastSection = sections[lastSectionIndex];
  const lastSectionTop = lastSection.offsetTop;

  return scrollPosition >= lastSectionTop - 50;
}

/**
 * 문서 맨 아래(푸터 포함)에 도달했는지 확인
 * @returns {boolean} 도달했으면 true
 */
function hasReachedFooter() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.body.scrollHeight;

  return scrollPosition + windowHeight >= docHeight - 50;
}

/**
 * 휠 스크롤 이벤트에 따라 섹션 단위로 이동합니다.
 * @param {WheelEvent} e 휠 이벤트 객체
 */
function scrollByPage(e) {
  // 화면 너비가 1024px 미만이면 무시
  if (window.innerWidth < 1024) return;

  // 내부 스크롤 가능한 요소에서는 동작 금지
  const ignoreScrollable = e.target.closest('.no-scroll');
  if (ignoreScrollable) return;

  // 마지막 섹션에 있는 경우 처리
  if (isInLastSection()) {
    if (e.deltaY < 0) {
      // 위로 스크롤할 때, 푸터에서 마지막 섹션 상단으로 이동
      if (hasReachedFooter()) {
        e.preventDefault();
        scrollToElement(sections[sections.length - 1]);
        return;
      }
      // 마지막 섹션 내에서는 일반 스크롤 허용
      return;
    } else {
      // 마지막 섹션에서 아래로 스크롤은 허용
      return;
    }
  }

  // 스크롤 중이면 기본 동작 막기
  if (scrollStatus) {
    e.preventDefault();
    return;
  }

  // 기본 스크롤 막기
  e.preventDefault();

  // 스크롤 방향 판별
  const direction = e.deltaY > 0 ? 'down' : 'up';

  // 현재 활성화된 섹션 찾기
  const scrollPosition = window.scrollY;
  let currentSectionIndex = 0;

  sections.forEach((section, index) => {
    if (section && scrollPosition >= section.offsetTop - 200) {
      currentSectionIndex = index;
    }
  });

  // 이동할 다음 섹션 결정
  let nextSectionIndex;
  if (direction === 'down') {
    nextSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
  } else {
    nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
  }

  // 현재 섹션과 같으면 이동하지 않음
  if (nextSectionIndex === currentSectionIndex) return;

  // 다음 섹션으로 부드럽게 스크롤
  const nextSection = sections[nextSectionIndex];
  if (nextSection) {
    scrollToElement(nextSection);
  }
}

// wheel 이벤트로 스크롤 조작 (passive: false 필수)
window.addEventListener('wheel', scrollByPage, { passive: false });
