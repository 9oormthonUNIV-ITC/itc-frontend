/**
* 메인페이지 섹션5 : 구유4기 트랙소개/ 탭탭버튼 클릭이벤트 + 카드슬라이드복제
*/

const cardList = document.querySelector('.card-linear');
const buttons = document.querySelectorAll('.btn-gradient');
const allOriginalCards = Array.from(cardList.querySelectorAll('li')).filter(li => !li.dataset.clone);

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const type = button.getAttribute('data-type');

    // 1. 기존 복제 카드 제거
    const clonedCards = cardList.querySelectorAll('li[data-clone="true"]');
    clonedCards.forEach(clone => clone.remove());

    // 2. 모든 원본 카드를 일단 숨김
    allOriginalCards.forEach(card => {
      card.style.display = 'none';
    });

    // 3. 조건에 맞는 원본 카드만 표시
    const filtered = allOriginalCards.filter(card => {
      const cardType = card.getAttribute('data-type');
      return type === 'ALL' || cardType === type;
    });

    filtered.forEach(card => {
      card.style.display = 'block';
      card.classList.remove('animate-card-mobile-left', 'lg:animate-card-left');
      void card.offsetWidth;
      card.classList.add('animate-card-mobile-left', 'lg:animate-card-left');
    });

    // 4. 부족하면 복제해서 채움 (최대 20개)
    for (let i = filtered.length; i < 20; i++) {
      const original = filtered[i % filtered.length];
      const clone = original.cloneNode(true);
      clone.dataset.clone = "true";
      clone.classList.remove('animate-card-mobile-left', 'lg:animate-card-left');
      void clone.offsetWidth;
      clone.classList.add('animate-card-mobile-left', 'lg:animate-card-left');
      cardList.appendChild(clone);
    }
  });
});
