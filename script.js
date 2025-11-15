document.addEventListener("DOMContentLoaded", () => {
  const views = document.querySelectorAll(".view");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const roleButtons = document.getElementById("roleButtons");

  const HOME_VIEW_ID = "view-home";
  let currentViewId = HOME_VIEW_ID;

  // ---------- HERO INTRO ----------
  function playHeroAnimation() {
    heroTitle.textContent = "";
    heroTitle.classList.remove("hero-title--visible");
    heroSubtitle.classList.remove("fade-in");
    roleButtons.classList.remove("fade-in");

    // 1) SirPaul appears
    setTimeout(() => {
      heroTitle.textContent = "SirPaul";
      heroTitle.classList.add("hero-title--visible");
    }, 200);

    // 2) subtitle + buttons fade in
    setTimeout(() => {
      heroSubtitle.classList.add("fade-in");
      roleButtons.classList.add("fade-in");
    }, 900);
  }

  // ---------- STOP VIDEOS ONLY IN CURRENT VIEW ----------
  function stopVideosInCurrentView() {
    const activeView = document.querySelector(".view.view--active");
    if (!activeView) return;

    const iframes = activeView.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      const src = iframe.src;
      // reload only this iframe (stops playback)
      iframe.src = "";
      iframe.src = src;
    });
  }

  // ---------- VIEW SWITCHER ----------
  function showView(id) {
    // stop any playing videos in the view we're leaving
    stopVideosInCurrentView();

    views.forEach((v) => v.classList.remove("view--active"));

    const target = document.getElementById(id);
    if (!target) return;

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
      if (!heroTitle.dataset.animationPlayed) {
        playHeroAnimation();
        heroTitle.dataset.animationPlayed = "true";
      }
    }
  }

  // ---------- BUTTON NAV ----------
  document.querySelectorAll("[data-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      if (targetId) showView(targetId);
    });
  });

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

      // only track if touch begins near the left edge
      const LEFT_EDGE_LIMIT = 70; // px
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

      const MIN_DISTANCE = 80;
      const MAX_VERTICAL = 60;
      const MAX_TIME = 600;

      if (dt < MAX_TIME && dx > MIN_DISTANCE && Math.abs(dy) < MAX_VERTICAL) {
        showView(HOME_VIEW_ID);
      }
    },
    { passive: true }
  );

  // initial load
  showView(HOME_VIEW_ID);
});
