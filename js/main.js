document.querySelectorAll("[data-slideshow]").forEach((root) => {
  const slides = [...root.querySelectorAll(".slideshow__slide")];
  const dots = [...root.querySelectorAll("[data-slideshow-dots] button")];
  const prev = root.querySelector("[data-slideshow-prev]");
  const next = root.querySelector("[data-slideshow-next]");
  const viewport = root.querySelector(".slideshow__viewport");
  const lightbox = root.parentElement?.querySelector("[data-lightbox]") || document.querySelector("[data-lightbox]");
  const lightboxImg = lightbox?.querySelector("[data-lightbox-img]");
  const lightboxClose = lightbox?.querySelector("[data-lightbox-close]");
  let index = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (index < 0) index = 0;

  const show = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  };

  const openLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    const activeImg = slides[index]?.querySelector("img");
    if (!activeImg) return;
    lightboxImg.src = activeImg.currentSrc || activeImg.src;
    lightboxImg.alt = activeImg.alt || "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightboxImg.removeAttribute("src");
    document.body.classList.remove("lightbox-open");
  };

  prev?.addEventListener("click", () => show(index - 1));
  next?.addEventListener("click", () => show(index + 1));
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => show(i));
  });

  viewport?.addEventListener("click", openLightbox);
  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });
});
