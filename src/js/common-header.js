let sidenav_outside = document.querySelector(".sidenav-outside");
let hamburger = document.querySelector(".hamburger");
let show_mobile_nav_flag = false;
sidenav_outside.addEventListener("click", mobileNavClose);
hamburger.addEventListener("click", mobileNavToggle);
window.addEventListener("resize", checkResize);
function mobileNavToggle() {
  if (show_mobile_nav_flag) mobileNavClose();
  else mobileNavOpen();
}
function mobileNavClose() {
  console.log("click!!");
  let tg1 = document.querySelector(".sidenav-outside");
  let tg2 = document.querySelector(".sidenav");
  show_mobile_nav_flag = false;
  tg1.classList.add("hidden");
  tg2.classList.add("hidden");
}
function mobileNavOpen() {
  let tg1 = document.querySelector(".sidenav-outside");
  let tg2 = document.querySelector(".sidenav");
  show_mobile_nav_flag = true;
  tg1.classList.remove("hidden");
  tg2.classList.remove("hidden");
}
function checkResize() {
  if (window.innerWidth >= 768) {
    show_mobile_nav_flag = false;
    mobileNavClose();
  }
}
