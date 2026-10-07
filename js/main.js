"use strict";

document.documentElement.classList.add("sv-js");

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const mobileMenu = document.querySelector("#menuPrincipal");

if (mobileMenu) {
  mobileMenu.querySelectorAll("a.nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth >= 992 || !window.bootstrap) return;

      window.bootstrap.Collapse.getOrCreateInstance(mobileMenu, {
        toggle: false,
      }).hide();
    });
  });
}

const galleryButtons = [...document.querySelectorAll("[data-gallery-filter]")];
const galleryItems = [...document.querySelectorAll("[data-gallery-item]")];
const galleryResult = document.querySelector("[data-gallery-result]");

if (galleryButtons.length && galleryItems.length) {
  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.galleryFilter;
      let visibleItems = 0;

      galleryButtons.forEach((filterButton) => {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("is-active", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
      });

      galleryItems.forEach((item) => {
        const isVisible = selectedCategory === "all" || item.dataset.category === selectedCategory;
        item.hidden = !isVisible;
        if (isVisible) visibleItems += 1;
      });

      if (galleryResult) {
        const noun = visibleItems === 1 ? "espacio provisional visible" : "espacios provisionales visibles";
        galleryResult.textContent = `${visibleItems} ${noun}`;
      }
    });
  });
}

const revealElements = document.querySelectorAll(
  ".sv-section-heading, .sv-card, .sv-gallery-card, .sv-team-card, .sv-social-card, .sv-join-step, .sv-rules-grid article, .sv-timeline li"
);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("sv-reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const backToTopButton = document.createElement("button");
backToTopButton.type = "button";
backToTopButton.className = "sv-back-to-top";
backToTopButton.setAttribute("aria-label", "Volver al inicio de la página");
backToTopButton.setAttribute("title", "Volver arriba");
backToTopButton.innerHTML = '<span aria-hidden="true">↑</span>';
document.body.append(backToTopButton);

const updateBackToTop = () => {
  backToTopButton.classList.toggle("is-visible", window.scrollY > 520);
};

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});
