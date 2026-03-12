const title = document.querySelector(".intro h1");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (title) {
  let glow = 0;

  setInterval(() => {
    glow = (glow + 1) % 360;
    title.style.textShadow = `
      0 0 15px hsla(${glow}, 100%, 60%, 0.8),
      0 0 35px hsla(${glow}, 100%, 55%, 0.55)
    `;
  }, 120);
}

/* apparition douce des cartes */
const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "all 0.7s ease";
  observer.observe(card);
});