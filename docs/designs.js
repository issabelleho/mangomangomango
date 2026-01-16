document.addEventListener("DOMContentLoaded", () => {
  // Stagger in
  const cards = document.querySelectorAll(".designCard");
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add("is-visible"), i * 80);
  });

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const closeEls = lb.querySelectorAll("[data-close]");

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "Design preview";
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const src = card.getAttribute("data-full");
      const img = card.querySelector("img");
      openLightbox(src, img ? img.alt : "");
    });
  });

  closeEls.forEach(el => el.addEventListener("click", closeLightbox));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});
