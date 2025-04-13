document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("editBtn");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector("svg");
  const cancelBtn = document.getElementById("cancelBtn");

  // 🚀 모달 열기
  editButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // 🚀 모달 닫기 -> X 버튼 클릭시
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // 🚀 모달 닫기 -> 취소 버튼 클릭시
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
