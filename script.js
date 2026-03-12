const title = document.querySelector(".intro h1");
const year = document.getElementById("year");
const reveals = document.querySelectorAll(".reveal");
const heroImage = document.querySelector(".me img");
const buttons = document.querySelectorAll(".btn");
const cards = document.querySelectorAll(".project-card, .pro-card, .about-detail-card");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* ======================
   GLOW PREMIUM DU TITRE
====================== */
if (title) {
  let glow = 0;

  setInterval(() => {
    glow = (glow + 1.2) % 360;

    title.style.textShadow = `
      0 0 10px hsla(${glow}, 100%, 70%, 0.35),
      0 0 24px hsla(${glow}, 100%, 62%, 0.28),
      0 0 50px hsla(${glow}, 100%, 55%, 0.22)
    `;
  }, 60);
}

/* ======================
   ENTRÉE HERO PREMIUM
====================== */
window.addEventListener("load", () => {
  if (heroImage) {
    heroImage.animate(
      [
        { opacity: 0, transform: "translateY(30px) scale(0.92)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards"
      }
    );
  }

  if (title) {
    title.animate(
      [
        { opacity: 0, transform: "translateY(24px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards"
      }
    );
  }
});

/* ======================
   REVEAL PREMIUM AU SCROLL
====================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const delay = element.dataset.delay || 0;

      element.animate(
        [
          {
            opacity: 0,
            transform: "translateY(40px) scale(0.98)",
            filter: "blur(8px)"
          },
          {
            opacity: 1,
            transform: "translateY(0) scale(1)",
            filter: "blur(0)"
          }
        ],
        {
          duration: 900,
          delay: Number(delay),
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards"
        }
      );

      element.classList.add("active");
      revealObserver.unobserve(element);
    });
  },
  {
    threshold: 0.14
  }
);

/* délai progressif pour les éléments */
reveals.forEach((element, index) => {
  element.dataset.delay = (index % 4) * 90;
  revealObserver.observe(element);
});

/* ======================
   EFFET PARALLAX LÉGER HERO
====================== */
window.addEventListener("mousemove", (e) => {
  if (!heroImage || !title) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  heroImage.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px) scale(1.02)`;
  title.style.transform = `translate(${x * 0.25}px, ${y * 0.2}px)`;
});

/* remettre en place quand la souris sort */
window.addEventListener("mouseleave", () => {
  if (heroImage) {
    heroImage.style.transform = "translate(0, 0) scale(1)";
  }

  if (title) {
    title.style.transform = "translate(0, 0)";
  }
});

/* ======================
   BOUTONS : MICRO-INTERACTION PREMIUM
====================== */
buttons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.background = `
      radial-gradient(circle at ${x}px ${y}px,
      rgba(255,255,255,0.35) 0%,
      rgba(255,255,255,0.12) 18%,
      transparent 45%),
      linear-gradient(145deg, #00bfff, #007acc)
    `;
  });

  button.addEventListener("mouseleave", () => {
    if (button.classList.contains("btn-outline")) {
      button.style.background = "transparent";
    } else {
      button.style.background = "linear-gradient(145deg, #00bfff, #007acc)";
    }
  });
});

/* ======================
   CARDS : EFFET 3D LÉGER
====================== */
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -((y - rect.height / 2) / rect.height) * 5;
    const rotateY = ((x - rect.width / 2) / rect.width) * 5;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ======================
   SCROLL PROGRESS INDICATOR
====================== */
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "4px";
progressBar.style.width = "0%";
progressBar.style.zIndex = "9999";
progressBar.style.background = "linear-gradient(90deg, #00bfff, #007acc)";
progressBar.style.boxShadow = "0 0 12px rgba(0, 191, 255, 0.7)";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
});