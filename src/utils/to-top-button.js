/* Back to top button */
function backToTop() {
  let toTopButton = document.getElementById("toTopBtn");
  toTopButton.addEventListener("click", () => toTopFunction());

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 2000 ||
      document.documentElement.scrollTop > 2000
    ) {
      toTopButton.style.display = "block";
    } else {
      toTopButton.style.display = "none";
    }
  }

  function toTopFunction() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE e Opera
  }
}

export default backToTop;
