let lightMode = localStorage.getItem("light-mode");
const darkModeToggles = document.querySelectorAll(".dark-mode-toggle");
const lightIcons = document.querySelectorAll(".bi-sun");
const darkIcons = document.querySelectorAll(".bi-moon");
const desktopNav = document.querySelector(".desktop-nav");
const buttons = document.querySelectorAll(".data-btn");
const statusBadge = document.querySelector(".hero__status");

/* div di riferimemto per l'observer messo prima della navbar */
const scrollWatcher = document.createElement("div");
scrollWatcher.setAttribute("data-scrol-watcher", "");
desktopNav.before(scrollWatcher);

/* check iniziale al primo caricamento per settare il localStorage (dark mode di deafault) */
if (localStorage.getItem("light-mode") == null) {
  localStorage.setItem("light-mode", "disabled");
}

/* state observer globale */
let isObserving;

const enableDarkMode = () => {
  document.body.classList.add("light-mode");
  localStorage.setItem("light-mode", "enabled");
  lightIcons.forEach((icon) => icon.classList.toggle("toggle-light"));
  darkIcons.forEach((icon) => icon.classList.toggle("toggle-dark"));
  buttons.forEach((button) => button.classList.remove("btn"));
  buttons.forEach((button) => button.classList.add("btn-light"));
  statusBadge.classList.remove("hero__status");
  statusBadge.classList.add("hero__status-light");
};

const disableDarkMode = () => {
  document.body.classList.remove("light-mode");
  localStorage.setItem("light-mode", "disabled");
  lightIcons.forEach((icon) => icon.classList.toggle("toggle-light"));
  darkIcons.forEach((icon) => icon.classList.toggle("toggle-dark"));
  buttons.forEach((button) => button.classList.remove("btn-light"));
  buttons.forEach((button) => button.classList.add("btn"));
  statusBadge.classList.remove("hero__status-light");
  statusBadge.classList.add("hero__status");
};

/* attiva lightmode ai caricamenti successivi in base al valore del localStorage */
if (lightMode === "enabled") {
  enableDarkMode();
}

/* Observer globale per stile navbar desktop */
const navObserver = new IntersectionObserver((entries) => {
  if (localStorage.getItem("light-mode") === "disabled") {
    if (!entries[0].isIntersecting) {
      desktopNav.classList.add("nav-dark");
      /* desktopNav.classList.remove("nav-light"); */
    } else {
      desktopNav.classList.remove("nav-light");
      desktopNav.classList.remove("nav-dark");
    }
  }
  if (localStorage.getItem("light-mode") === "enabled") {
    if (!entries[0].isIntersecting) {
      desktopNav.classList.add("nav-light");
      /* desktopNav.classList.remove("nav-dark"); */
    } else {
      desktopNav.classList.remove("nav-dark");
      desktopNav.classList.remove("nav-light");
    }
  }
});

navObserver.observe(scrollWatcher);

/* listener sul button (due icone svg) per switch tema */
export function listenForThemeToggle() {
  darkModeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      lightMode = localStorage.getItem("light-mode");

      if (lightMode !== "enabled") {
        // reset observer altrimenti si sommano ad ogni switch
        isObserving = false;
        navObserver.unobserve(scrollWatcher);

        if (!isObserving) {
          desktopNav.classList.add("nav-light");
          desktopNav.classList.remove("nav-dark");
        }
        navObserver.observe(scrollWatcher);
        isObserving = true;
        enableDarkMode();
      } else {
        // reset observer altrimenti si sommano ad ogni switch
        isObserving = false;
        navObserver.unobserve(scrollWatcher);

        if (!isObserving) {
          desktopNav.classList.add("nav-dark");
          desktopNav.classList.remove("nav-light");
        }
        navObserver.observe(scrollWatcher);
        isObserving = true;
        disableDarkMode();
      }
    });
  });
}
