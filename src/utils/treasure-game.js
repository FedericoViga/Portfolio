const random1 = Math.floor(Math.random() * (50000 - 1 + 1)) + 1;
const random2 = Math.floor(Math.random() * (50000 - 1 + 1)) + 1;

const chestContainer = document.getElementById("treasure-chest-container");
const chestSvg = document.getElementById("treasure-chest-svg");
const mrrContainer = document.getElementById("mrr");
const mrrImg = document.createElement("img");
const newPara = document.createElement("p");

function dropMrr() {
  chestContainer.style.width = "auto";
  chestContainer.style.height = "auto";
  mrrImg.src = "/mrr.png";
  mrrContainer.appendChild(mrrImg);
  mrrContainer.style.flexDirection = "column";
  mrrContainer.style.gap = "1em";
  mrrContainer.style.cursor = "pointer";
  newPara.classList.add("game-text");
  newPara.textContent = "Incredibile, hai trovato il MIRROR!";
}

chestContainer.addEventListener("click", () => {
  if (random1 === random2) {
    chestSvg.style.display = "none";
    dropMrr();
    mrrContainer.insertBefore(newPara, mrrImg);
    mrrContainer.style.display = "flex";
    newPara.style.display = "block";
    newPara.classList.add("appear-animation");
    mrrImg.classList.add("appear-animation");
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  } else {
    chestSvg.style.display = "none";
    const newPara = document.createElement("p");
    newPara.classList.add("game-text");
    newPara.textContent = "Peccato, questa volta niente TESORO...";
    chestContainer.style.width = "auto";
    chestContainer.appendChild(newPara);
    newPara.style.display = "block";
    newPara.classList.add("appear-animation");
  }
});
