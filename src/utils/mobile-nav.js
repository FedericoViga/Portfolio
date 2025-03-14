const mobileNav = document.querySelector(".mobile-nav");
const headerBtnOpen = document.querySelector(".header__bars");
const headerBtnClose = document.querySelector(".header__cross");
let isMobileNavOpen = false; // state menu aperto/chiuso

/* delay per throttling resize */
const delay = 250;
let throttled = false;

function desktopView() {
  isMobileNavOpen = false;
  headerBtnOpen.style.display = "none";
  headerBtnClose.style.display = "none";
  mobileNav.style.display = "none";
  document.body.style.overflowY = "auto";
}

function mobileView() {
  headerBtnOpen.style.display = "block";
  headerBtnClose.style.display = "none";
}

/* Chiude il menu appena si va in landscape da mobile */
screen.orientation.addEventListener("change", (event) => {
  if (event.target.angle === 90) {
    isMobileNavOpen = false;
    headerBtnOpen.style.display = "none";
    headerBtnClose.style.display = "none";
    mobileNav.style.display = "none";
    document.body.style.overflowY = "auto";
  }
});

/* Comparsa/scomparsa di tutto il menu e di button hamburger e button X al resize della finestra */
window.addEventListener("resize", (event) => {
  if (event.target.innerWidth > 768) {
    if (!throttled) {
      desktopView();
      throttled = true;
      setTimeout(() => {
        throttled = false;
      }, delay);
    }
  }

  if (!isMobileNavOpen && event.target.innerWidth < 768) {
    if (!throttled) {
      mobileView();
      throttled = true;
      setTimeout(() => {
        throttled = false;
      }, delay);
    }
  }
});

/* Toggle button hamburger e button X ai rispettivi click */
const mobileNavToggle = () => {
  const mobileLinks = document.querySelectorAll(".mobile-nav__link");

  headerBtnOpen.addEventListener("click", () => {
    isMobileNavOpen = false;
    isMobileNavOpen = !isMobileNavOpen;

    if (isMobileNavOpen) {
      mobileNav.style.display = "flex";
      document.body.style.overflowY = "hidden"; // blocca lo scroll nel drawer mobile
      headerBtnOpen.style.display = "none";
      headerBtnClose.style.display = "block";
    }
  });

  headerBtnClose.addEventListener("click", () => {
    isMobileNavOpen = false;
    mobileNav.style.display = "none";
    document.body.style.overflowY = "auto";
    headerBtnOpen.style.display = "block";
    headerBtnClose.style.display = "none";
  });

  /* Mostra/nascondi menu e buttons al click dei link della nav */
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      isMobileNavOpen = false; // chiude menu mobile
      mobileNav.style.display = "none";
      headerBtnClose.style.display = "none";
      headerBtnOpen.style.display = "block";
      document.body.style.overflowY = "auto"; // ripristina scroll
    });
  });
};

mobileNavToggle();
