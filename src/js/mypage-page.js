const dltBtn = document.getElementById("mypage-delete-account-btn");
const cnlBtn = document.getElementById("mypage-cancel-btn");
const saveBtn = document.getElementById("mypage-save-btn");
const userNameInput = document.getElementById("user-name");
const userEmailInput = document.getElementById("user-email");
const profileInfoForm = document.getElementById("profile-info-form");
const deleteNoticeModal = document.getElementById("mypage-delete-notice-modal");

// DB에서 가져온 초기 정보
// 더미 데이터
let accountData = {
  userName: "이훈진",
  userEmail: "hhzz@gamil.com",
};

// 저장 버튼을 눌렀을 때 form의 action 속성에 넣을 링크 세팅
profileInfoForm.setAttribute("action", "#");

userNameInput.value = accountData.userName;
userEmailInput.value = accountData.userEmail;

dltBtn.addEventListener("click", deleteAccount);
cnlBtn.addEventListener("click", cancelEdit);
saveBtn.addEventListener("click", saveInfo);

function deleteAccount() {
  deleteNoticeModal.classList.remove("hidden");
  deleteNoticeModal.style.animationPlayState = "running";
  setTimeout(() => {
    deleteNoticeModal.style.animation = "none";
    deleteNoticeModal.style.animationPlayState = "paused";
    deleteNoticeModal.style.animation = "var(--animate-disappear-notice-modal)";
    deleteNoticeModal.style.translate = "-50% 220%";
  }, 2000);
  setTimeout(() => {
    deleteNoticeModal.style.animationPlayState = "running";
  }, 2010);
  setTimeout(() => {
    deleteNoticeModal.classList.add("hidden");
    deleteNoticeModal.style.translate = "-50% 0";
    deleteNoticeModal.style.animation = "var(--animate-appear-notice-modal)";
    deleteNoticeModal.style.animationPlayState = "paused";
  }, 4010);
}

function cancelEdit() {
  userNameInput.value = accountData.userName;
  userEmailInput.value = accountData.userEmail;
}

// 저장 버튼을 눌렀을 때 실행될 함수
function saveInfo() {
  accountData.userName = userNameInput.value;
  accountData.userEmail = userEmailInput.value;
}
