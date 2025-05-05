// src/js/auth.justify-around

const TOKEN_KEY = "ACCESS_TOKEN";
const USER_KEY = "USER_INFO"; // 사용자 정보 캐싱 키

/**
 * 🚀 현재 로그인 여부 확인
 * @returns {boolean} – 토큰이 있으면 true
 */
export function isLoggedIn() {
  return !!sessionStorage.getItem(TOKEN_KEY);
}
// 🚀 로그인한 사용자 정보 가져오기

/**
 * 🚀 로그아웃 처리
 * – 세션 스토리지에서 토큰·유저 정보 제거
 */
export function logout() {
  // fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  window.location.href = "/";
}

// 🚀 UI 초기화
