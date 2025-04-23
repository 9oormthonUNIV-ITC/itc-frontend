const cardList = document.querySelector('.card-linear');
const cardItems = Array.from(cardList.children);

cardItems.forEach((item) => {
  const cardCloneList = item.cloneNode(true);
  cardList.appendChild(cardCloneList);
});

// 탭 클릭 이벤트
const buttons = document.querySelectorAll('.btn-gradient');
const cards = document.querySelectorAll('ul.card-linear > li');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    
    button.classList.add('active');

    const type = button.getAttribute('data-type');

    // 카드 보여주기/숨기기 처리
    cards.forEach(card => {
      const cardType = card.getAttribute('data-type');
      if (type === 'ALL' || cardType === type) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});