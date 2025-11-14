document.addEventListener("DOMContentLoaded", () => {
  const views = document.querySelectorAll(".view");
  const hero = document.getElementById("view-home");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const roleButtons = document.getElementById("roleButtons");

  const HOME_VIEW_ID = "view-home";
  let currentViewId = HOME_VIEW_ID;

  // ---------- VIEW SWITCHER ----------
  function showView(id) {
    views.forEach((v) => v.classList.remove("view--active"));

    const target = document.getElementById(id);
    if (target) {
      target.classList.add("view--active");
      currentViewId = id;

      // always jump to top when changing section
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      // run hero intro only first time we go to home
      if (id === HOME_VIEW_ID) {
        if (!hero.dataset.animationPlayed) {
          playHeroAnimation();
          hero.dataset.animationPlayed = "true";
        }
      }
    }
  }

  // hook up all buttons with data-target
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

  // ---------- SWIPE BACK (MOBILE, LEFT-EDGE STYLE) ----------
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let swipeActive = false;

  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];

      // only start tracking if the touch begins near the left edge
      const LEFT_EDGE_LIMIT = 70; // px from the left edge
      if (t.clientX > LEFT_EDGE_LIMIT) {
        swipeActive = false;
        return;
      }

      swipeActive = true;
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchStartTime = Date.now();
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      if (!swipeActive) return;
      swipeActive = false;
      if (e.changedTouches.length !== 1) return;

      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      const dt = Date.now() - touchStartTime;

      // only swipe-back when not on home
      if (currentViewId === HOME_VIEW_ID) return;

      // swipe-right detection
      const MIN_DISTANCE = 80; // how far the swipe must travel
      const MAX_VERTICAL = 60; // how much vertical movement is allowed
      const MAX_TIME = 600; // max time in ms

      if (dt < MAX_TIME && dx > MIN_DISTANCE && Math.abs(dy) < MAX_VERTICAL) {
        // go back to main hero view
        showView(HOME_VIEW_ID);
      }
    },
    { passive: true }
  );

  // initial load
  showView(HOME_VIEW_ID);
});
