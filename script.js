document.addEventListener("DOMContentLoaded", () => {
  const views = document.querySelectorAll(".view");
  const hero = document.getElementById("view-home");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const roleButtons = document.getElementById("roleButtons");
  const hireButton = document.getElementById("hireButton");

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

  function playHeroAnimation() {
    hero.classList.remove(
      "hero--settled",
      "hero--interactive",
      "hero--cloud-visible"
    );

    heroTitle.textContent = "";
    heroTitle.classList.remove("hero-title--visible", "hero-title--top");
    heroSubtitle.classList.remove("fade-in");
    roleButtons.classList.remove("fade-in");
    hireButton.classList.remove("fade-in");

    // cloud
    setTimeout(() => {
      hero.classList.add("hero--cloud-visible");
    }, 100);

    // SirPaul in the cloud
    setTimeout(() => {
      heroTitle.textContent = "SirPaul";
      heroTitle.classList.add("hero-title--visible");
    }, 800);

    // full hero + About Me in corner
    setTimeout(() => {
      hero.classList.add("hero--settled");
      hero.classList.add("hero--interactive");
      heroTitle.classList.add("hero-title--top");

      heroSubtitle.classList.add("fade-in");
      roleButtons.classList.add("fade-in");
      hireButton.classList.add("fade-in");
    }, 1500);
  }

  showView("view-home");
});
