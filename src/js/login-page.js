/**
 * 로그인페이지
 * 백엔드 연결 이후 auth.js와 연결하여 로그인한 이용자만 접근 가능하게 로직 변경 예정
 */

// const loginBtn = document.getElementById('loginBtn');
// // 캡처 단계에서 딱 막아서 뒤따르는 클릭 리스너 무조건 차단
// loginBtn.addEventListener(
//   'click',
//   (e) => {
//     e.preventDefault();
//     e.stopImmediatePropagation();
//     alert('접근 권한이 없습니다.');
//   },
//   { capture: true }
// );

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  // 마우스 클릭
  loginBtn.addEventListener("click", () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  });
});
