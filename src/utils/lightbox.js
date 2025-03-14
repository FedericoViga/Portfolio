const lightbox = () => {
  const images = document.querySelectorAll("img");

  /* apri lightbox */
  images.forEach((image) => {
    image.onclick = () => {
      document.querySelector(".popup-image").style.display = "block";
      document.querySelector(".popup-image img").src =
        image.getAttribute("src");
      document.body.style.overflow = "hidden";
    };
  });
  /* chiudi lightbox */
  document.querySelector(".popup-image span").onclick = () => {
    document.querySelector(".popup-image").style.display = "none";
    document.body.style.overflow = "visible";
  };
};

export default lightbox;
