const editBtn = document.getElementById("feed-page-edit-btn");
const submitBtn = document.getElementById("feed-page-submit-btn");
const cancelBtn = document.getElementById("feed-page-cancel-btn");
const closeBtn = document.getElementById("feed-page-close-btn");
const modal = document.getElementById("feed-page-edit-modal");
const innerModal = document.getElementById("feed-page-edit-inner-modal");

modal.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
editBtn.addEventListener("click", openModal);
submitBtn.addEventListener("click", submitLink);
innerModal.addEventListener("click", preventBubbling());

function closeModal() {
  modal.classList.add("hidden");
  return false;
}

function openModal() {
  modal.classList.remove("hidden");
}
function preventBubbling() {
  return function (e) {
    e.stopPropagation();
  };
}
function submitLink() {}
