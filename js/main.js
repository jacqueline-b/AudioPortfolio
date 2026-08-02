const yearEl = document.querySelector("[data-year]");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const headers = document.querySelectorAll(".section__header");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2 }
  );

  headers.forEach((header) => observer.observe(header));
} else {
  headers.forEach((header) => header.classList.add("is-visible"));
}
