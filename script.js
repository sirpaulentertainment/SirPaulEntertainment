document.addEventListener("DOMContentLoaded", () => {
  const views = document.querySelectorAll(".view");
  const hero = document.getElementById("view-home");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const roleButtons = document.getElementById("roleButtons");
  const hireButton = document.getElementById("hireButton");

  // Simple view switcher (single-page app)
  function showView(id) {
    views.forEach((v) => v.classList.remove("view--active"));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("view--active");
      if (id === "view-home") {
        // only play animation first time; no restart on back
        if (!hero.dataset.animationPlayed) {
          playHeroAnimation();
          hero.dataset.animationPlayed = "true";
        }
      }
    }
  }

  // Hook buttons with data-target to the view switcher
  document.querySelectorAll("[data-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      if (targetId) showView(targetId);
    });
  });

  // HERO INTRO ANIMATION
  function playHeroAnimation() {
    hero.classList.remove("hero--settled", "hero--interactive");
    heroTitle.textContent = "";
    heroSubtitle.classList.remove("fade-in");
    roleButtons.classList.remove("fade-in");
    hireButton.classList.remove("fade-in");

    // Step 1: show "SirPaul"
    setTimeout(() => {
      heroTitle.textContent = "SirPaul";
      heroTitle.classList.add("hero-title--visible");
    }, 400);

    // Step 2: morph into "SirPaulEntertainment"
    setTimeout(() => {
      heroTitle.classList.add("hero-title--morph");
      heroTitle.textContent = "SirPaulEntertainment";
    }, 1700);

    // Step 3: move up and reveal subtitle + buttons
    setTimeout(() => {
      hero.classList.add("hero--settled");
      hero.classList.add("hero--interactive");
      heroTitle.classList.add("hero-title--top");

      heroSubtitle.classList.add("fade-in");
      roleButtons.classList.add("fade-in");
      hireButton.classList.add("fade-in");
    }, 3000);
  }

  // Initial load: show home + play animation once
  showView("view-home");
});
