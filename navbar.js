let throttling = false;

function onScrollThrottled() {
  if (!throttling) {
    throttling = true;
    requestAnimationFrame(() => {
      onScroll();
      throttling = false;
    });
  }
}

let navbarTop = 0;
let transition = true;
let position = "absolute";
let lastScrollPosition = 0;

const navbar = document.getElementById("navbar");

function onScroll() {

  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (currentScrollPosition <= 0) {

    lastScrollPosition = 0;
    navbarTop = 0;

    if (position !== "absolute") { transition = true; }
    else { transition = false; }
    position = "absolute";

  } else {
    
    if (currentScrollPosition > lastScrollPosition) {

      if (position !== "absolute") { transition = true; }
      else { transition = false; }
      position = "absolute";

      let { top, height } = navbar.getBoundingClientRect()
      navbarTop = currentScrollPosition + Math.max(top, -height);

    } else {

      const { top } = navbar.getBoundingClientRect()

      if (top >= 0) {

        navbarTop = 0;

        if (position !== "fixed") { transition = true; }
        else { transition = false; }
        position = "fixed";
      }
    }

    lastScrollPosition = currentScrollPosition;

  }
  navbar.style = `position: ${position}; top: ${navbarTop}px; transition: ${ transition ? "none" : "100ms linear" }`;
}

window.addEventListener("scroll", onScrollThrottled, { passive: true });
