import "../styles/modern-normalize.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/hero.css";
import "../styles/components/about.css";
import "../styles/components/featured.css";
import "../styles/components/work.css";
import "../styles/components/contact.css";
import "../styles/components/footer.css";
import "../styles/components/mobile-nav.css";
import "../styles/components/lightbox.css";
import "../styles/utils.css";

import lazyLoading from "./utils/lazy-loading";
import lightbox from "./utils/lightbox";
import backToTop from "./utils/to-top-button";
import { listenForThemeToggle } from "./utils/dark-mode";

listenForThemeToggle();
lazyLoading();
lightbox();
backToTop();
setYear();

/* Observer animazione sezione about */
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const firstLastContainers = document.querySelectorAll(".hidden");
const secondContainer = document.querySelector(".hidden-2");
firstLastContainers.forEach((el) => aboutObserver.observe(el));
aboutObserver.observe(secondContainer);

/* Email obfuscation */
window.addEventListener("load", () => {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach((link) => {
    link.addEventListener("click", () => {
      link.href = "mailto:";
      link.innerHTML = import.meta.env.VITE_EMAIL_STRING;
      link.href = link.href.toLowerCase() + link.innerText.toLowerCase();
      link.innerHTML = "Contatta via email";
      setTimeout(() => {
        link.href = "mailto:";
      }, 3000);
    });
  });
});

/* Anno dinamico nel footer */
function setYear() {
  function getYear() {
    const date = new Date();
    return date.getFullYear();
  }

  document.querySelector(
    ".footer__title"
  ).textContent = `${getYear()}  ${String.fromCodePoint(
    0x00b7
  )} Federico Viganò ${String.fromCodePoint(0x00b7)} Biassono (MB)`;
}
