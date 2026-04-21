const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((el) => observer.observe(el));

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const root = document.documentElement;
const modeToggle = document.getElementById("modeToggle");
const modeLabel = modeToggle?.querySelector("span");
const modeIcon = modeToggle?.querySelector("i");

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  const isLight = theme === "light";
  if (modeLabel) {
    modeLabel.textContent = isLight ? "Light Mode" : "Dark Mode";
  }
  if (modeIcon) {
    modeIcon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
};

const savedTheme = localStorage.getItem("portfolio-theme");
applyTheme(savedTheme === "light" ? "light" : "dark");

if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("portfolio-theme", next);
  });
}
