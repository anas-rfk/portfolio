const title = document.querySelector(".intro h1");
const year = document.getElementById("year");
const reveals = document.querySelectorAll(".reveal");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (title) {
  let glow = 0;

  setInterval(() => {
    glow = (glow + 1) % 360;
    title.style.textShadow = `
      0 0 15px hsla(${glow}, 100%, 60%, 0.85),
      0 0 35px hsla(${glow}, 100%, 55%, 0.55)
    `;
  }, 120);
}

const revealOnScroll = () => {
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);