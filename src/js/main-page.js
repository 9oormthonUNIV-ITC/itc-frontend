/**
* 메인페이지 휠 이벤트 함수
*/

// 스크롤 상태 확인
let scrollStatus = false;
let sections = [];
let asideLinks = [];
let lastSectionScrollable = true; // 마지막 섹션 내에서 스크롤 가능하도록 설정

document.addEventListener('DOMContentLoaded', () => {

  // 모든 section 배열화
  sections = [
    document.querySelector('#mainSection01'),
    document.querySelector('#mainSection02'),
    document.querySelector('#mainSection03'),
    document.querySelector('#mainSection04'),
    document.querySelector('#mainSection05')
  ];
  
  // 푸터 요소 가져오기
  const footer = document.querySelector('footer');
  
  // aside 링크 수집
  asideLinks = document.querySelectorAll('aside a');
  
  // 각 링크에 클릭 이벤트 추가
  asideLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (scrollStatus) return;
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // 클릭한 위치로 스크롤
        scrollToElement(targetElement);
        updateActiveLink(index);
      }
    });
  });
  
  // 초기 로드 시 현재 위치에 따라 active 상태 설정
  updateActiveLinkByScroll();
  
  // 스크롤 시 active 상태 업데이트
  window.addEventListener('scroll', function() {
    if (!scrollStatus) {
      updateActiveLinkByScroll();
    }
  });
});

// 요소로 스크롤하는 함수
function scrollToElement(element) {
  if (!element) return;
  
  scrollStatus = true;
  
  window.scrollTo({
    top: element.offsetTop,
    behavior: 'smooth'
  });
  
  setTimeout(() => {
    scrollStatus = false;
    updateActiveLinkByScroll();
  }, 1000);
}

// 현재 스크롤 위치에 따라 active 링크 업데이트
function updateActiveLinkByScroll() {
  const scrollPosition = window.scrollY;
  
  // 가장 가까운 섹션 찾기
  let activeIndex = 0;
  sections.forEach((section, index) => {
    if (section && scrollPosition >= section.offsetTop - 200) {
      activeIndex = Math.min(index, asideLinks.length - 1);
    }
  });
  
  // 마지막 섹션 여부 확인
  isLastSection = activeIndex === sections.length - 1;
  
  updateActiveLink(activeIndex);
}

// 인덱스를 기반으로 링크 활성화
function updateActiveLink(activeIndex) {
  if (typeof activeIndex === 'string') {
    // ID로 전달된 경우 인덱스로 변환
    asideLinks.forEach((link, index) => {
      if (link.getAttribute('href') === activeIndex) {
        activeIndex = index;
      }
    });
  }
  
  // 숫자 인덱스를 기반으로 활성화
  asideLinks.forEach((link, index) => {
    if (index === activeIndex) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 현재 마지막 섹션인지 확인하는 함수
function isInLastSection() {
  const scrollPosition = window.scrollY;
  const lastSectionIndex = sections.length - 1;
  
  if (lastSectionIndex < 0 || !sections[lastSectionIndex]) return false;
  
  const lastSection = sections[lastSectionIndex];
  const lastSectionTop = lastSection.offsetTop;
  
  // 마지막 섹션 영역에 있는지 확인
  return scrollPosition >= lastSectionTop - 50;
}

// 마지막 섹션에서 스크롤 제한에 도달했는지 확인
function hasReachedFooter() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.body.scrollHeight;
  
  // 문서 끝(푸터 포함)에 도달했는지 확인
  return scrollPosition + windowHeight >= docHeight - 50;
}


// 스크롤 함수
function scrollByPage(e) {
  // 뷰포트 1024px 미만일 경우 무시
  if (window.innerWidth < 1024) return;
  
  // 내부 스크롤 요소 무시
  const ignoreScrollable = e.target.closest('.no-scroll');
  if (ignoreScrollable) return;

  // 마지막 섹션에서의 처리
  if (isInLastSection()) {
    // 마지막 섹션에서 위로 스크롤하는 경우
    if (e.deltaY < 0) {
      // 푸터에서 위로 스크롤할 때 마지막 섹션의 상단으로 이동
      if (hasReachedFooter()) {
        e.preventDefault();
        scrollToElement(sections[sections.length - 1]);
        updateActiveLink(sections.length - 1);
        return;
      }
      // 마지막 섹션 내에서는 일반 스크롤 허용
      return;
    } else {
      // 아래로 스크롤하는 경우 일반 스크롤 허용
      return;
    }
  }

  // 스크롤 중일 때 이벤트 무시 및 기본 동작 방지
  if (scrollStatus) {
    e.preventDefault();
    return;
  }


  // 마우스 기본 스크롤 무시
  e.preventDefault();

  // 스크롤 방향 확인
  const direction = e.deltaY > 0 ? 'down' : 'up';
  
  // 현재 활성화된 섹션 찾기
  const scrollPosition = window.scrollY;
  let currentSectionIndex = 0;
  
  // 현재 보고 있는 섹션 인덱스 찾기
  sections.forEach((section, index) => {
    if (section && scrollPosition >= section.offsetTop - 200) {
      currentSectionIndex = index;
    }
  });
  
  // 다음 이동할 섹션 결정
  let nextSectionIndex;
  if (direction === 'down') {
    nextSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
  } else {
    nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
  }
  
  // 같은 섹션이면 무시
  if (nextSectionIndex === currentSectionIndex) return;
  
  // 다음 섹션으로 스크롤
  const nextSection = sections[nextSectionIndex];
  if (nextSection) {
    scrollToElement(nextSection);
    updateActiveLink(Math.min(nextSectionIndex, asideLinks.length - 1));
  }
}

// passive: false 설정으로 preventDefault() 허용
window.addEventListener('wheel', scrollByPage, { passive: false });

