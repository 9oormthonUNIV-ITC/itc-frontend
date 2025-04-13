let sidenav_outside = document.querySelector(".sidenav-outside");
let hamburger = document.querySelector(".hamburger");
let show_mobile_nav_flag = false;
let be_mobile_viewport_flag = false;
sidenav_outside.addEventListener("click", mobileNavClose);
hamburger.addEventListener("click", mobileNavToggle);
window.addEventListener("resize", checkResize);

function mobileNavToggle() {
  if (show_mobile_nav_flag) {
    mobileNavClose();
  } else {
    mobileNavOpen();
  }
  switchHamburgerIcon();
}

function mobileNavClose() {
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
    be_mobile_viewport_flag = true;
    show_mobile_nav_flag = false;
    hamburger.style.display = "none";
    mobileNavClose();
  }
  if (window.innerWidth < 768) initializeHamburger();
}

function initializeHamburger() {
  if (hamburger.style.display == "none") {
    hamburger.style.display = "flex";
    let x = hamburger.children[0];
    let y = hamburger.children[1];
    let z = hamburger.children[2];
    x.style.animation = "none";
    z.style.animation = "none";
    y.style.visibility = "visible";
    x.style.transition = "0 0";
    x.style.rotate = "0deg";
    x.style.scale = "1 1";
    z.style.transition = "0 0";
    z.style.rotate = "0deg";
    z.style.scale = "1 1";
  }
}

function switchHamburgerIcon() {
  let x = hamburger.children[0];
  let y = hamburger.children[1];
  let z = hamburger.children[2];
  if (!show_mobile_nav_flag) {
    x.style.animation = "none";
    z.style.animation = "none";
    x.style.animation = "var(--animate-move-topbar-reverse)";
    z.style.animation = "var(--animate-move-bottombar-reverse)";
    x.style.animationPlayState = "running";
    z.style.animationPlayState = "running";
    setTimeout(() => {
      y.style.visibility = "visible";
    }, 150);
    setTimeout(() => {
      x.style.animationPlayState = "paused";
      z.style.animationPlayState = "paused";
    }, 300);
  } else {
    x.style.animation = "none";
    z.style.animation = "none";
    x.style.animation = "var(--animate-move-topbar)";
    z.style.animation = "var(--animate-move-bottombar)";
    x.style.animationPlayState = "running";
    z.style.animationPlayState = "running";
    setTimeout(() => {
      y.style.visibility = "hidden";
    }, 150);
    setTimeout(() => {
      x.style.animationPlayState = "paused";
      z.style.animationPlayState = "paused";
    }, 300);
  }
}
