let sidenav_outside = document.querySelector(".sidenav-outside");
let hamburger = document.querySelector(".hamburger");
sidenav_outside.addEventListener("click", mobileNavClose);
hamburger.addEventListener("click", mobileNavOpen);
function mobileNavClose() {
  console.log("click!!");
  let tg1 = document.querySelector(".sidenav-outside");
  let tg2 = document.querySelector(".sidenav");
  tg1.classList.add("hidden");
  tg2.classList.add("hidden");
}
function mobileNavOpen() {
  let tg1 = document.querySelector(".sidenav-outside");
  let tg2 = document.querySelector(".sidenav");
  tg1.classList.remove("hidden");
  tg2.classList.remove("hidden");
}
