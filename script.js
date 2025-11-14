document.addEventListener("DOMContentLoaded", () => {
  const views = document.querySelectorAll(".view");
  const hero = document.getElementById("view-home");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const roleButtons = document.getElementById("roleButtons");

  // ---------- VIEW SWITCHER ----------
  function showView(id) {
    views.forEach((v) => v.classList.remove("view--active"));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("view--active");

      if (id === "view-home") {
        if (!hero.dataset.animationPlayed) {
          playHeroAnimation();
          hero.dataset.animationPlayed = "true";
        }
      }
    }
  }

  document.querySelectorAll("[data-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      if (targetId) showView(targetId);
    });
  });

  // ---------- HERO INTRO ----------
  // SirPaul appears first, then subtitle + ALL buttons
  function playHeroAnimation() {
    heroTitle.textContent = "";
    heroTitle.classList.remove("hero-title--visible");
    heroSubtitle.classList.remove("fade-in");
    roleButtons.classList.remove("fade-in");

    // 1) SirPaul
    setTimeout(() => {
      heroTitle.textContent = "SirPaul";
      heroTitle.classList.add("hero-title--visible");
    }, 200);

    // 2) Subtitle + both rows of buttons
    setTimeout(() => {
      heroSubtitle.classList.add("fade-in");
      roleButtons.classList.add("fade-in");
    }, 900);
  }

  // initial load
  showView("view-home");
});
