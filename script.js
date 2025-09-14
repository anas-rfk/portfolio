// Effet glow animé sur le titre principal
const title = document.querySelector(".intro h1");

let glow = 0;
setInterval(() => {
  glow = (glow + 1) % 360;
  title.style.textShadow = `
    0 0 15px hsl(${glow}, 100%, 60%),
    0 0 40px hsl(${glow}, 100%, 50%)
  `;
}, 120);
