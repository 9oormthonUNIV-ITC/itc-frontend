let isScrolling = false;

window.addEventListener('wheel', scrollByPage, { passive: false });

function scrollByPage(e) {
  // 1024px 미만일 경우 무시
  if (window.innerWidth < 1024) return;

  // 내부 스크롤 요소 무시
  const ignoreScrollable = e.target.closest('.no-scroll');
  if (ignoreScrollable) return;

  if (isScrolling) return;

  const direction = e.deltaY > 0 ? 'down' : 'up';
  const vh = window.innerHeight;

  // ✅ 현재 스크롤 위치를 100vh로 보정
  const currentScroll = Math.round(window.scrollY / vh) * vh;

  let targetScroll =
    direction === 'down' ? currentScroll + vh : currentScroll - vh;

  targetScroll = Math.max(
    0,
    Math.min(targetScroll, document.body.scrollHeight - vh)
  );

  isScrolling = true;

  window.scrollTo({
    top: targetScroll,
    behavior: 'smooth',
  });

  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

// gpt의 도움을 받은 부분이 있어 추후 수정 필요
// 주말동안 pc 로컬환경 사용하지 못함에 따라 임시 push
