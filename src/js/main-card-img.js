const cardList = document.querySelector('.card-linear');
const cardItems = Array.from(cardList.children);

cardItems.forEach((item) => {
  const cardCloneList = item.cloneNode(true);
  cardList.appendChild(cardCloneList);
});
