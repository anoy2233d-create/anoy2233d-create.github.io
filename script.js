/* ============================================================
   Anoy Kumar Das — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- nav: scrolled state + mobile menu ---- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");

  function onScrollNav() {
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  if (burger) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
  }
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      burger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  /* ---- active nav link on scroll ---- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var linkMap = {};
  navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) {
    linkMap[a.getAttribute("href").slice(1)] = a;
  });
  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove("active"); });
        var a = linkMap[e.target.id];
        if (a) a.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { navObserver.observe(s); });

  /* ---- typing effect ---- */
  var phrases = [
    "Operation Excellence Officer",
    "Industrial & Production Engineer",
    "Lean · Six Sigma Practitioner",
    "Data-Driven Process Improver"
  ];
  var typedEl = document.getElementById("typed");
  if (typedEl) {
    var pi = 0, ci = 0, deleting = false;
    (function tick() {
      var word = phrases[pi];
      if (!deleting) {
        typedEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; return setTimeout(tick, 1500); }
      } else {
        typedEl.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
      }
      setTimeout(tick, deleting ? 42 : 78);
    })();
  }

  /* ---- reveal on scroll ---- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  document.querySelectorAll(".reveal").forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i % 6, 5) * 70 + "ms";
    revealObserver.observe(el);
  });

  /* ---- counters ---- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var start = performance.now();
    var dur = 1300;
    (function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(dec) + suffix;
    })(start);
  }
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { animateCount(e.target); countObserver.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach(function (el) { countObserver.observe(el); });

  /* ---- skill bars fill ---- */
  var barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.querySelectorAll("i").forEach(function (i) { i.classList.add("fill"); });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll(".bars").forEach(function (el) { barObserver.observe(el); });

  /* ---- back to top ---- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- training: expandable program cards ---- */
  document.querySelectorAll(".prog-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".prog");
      if (card) card.classList.toggle("open");
    });
  });

  /* ---- training: certificate lightbox ---- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lbClose = document.getElementById("lbClose");

  function openLightbox(src, title) {
    if (!lb) return;
    lbImg.src = src;
    lbImg.alt = title || "Certificate";
    lbCap.textContent = title || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".cert-frame").forEach(function (frame) {
    frame.addEventListener("click", function () {
      openLightbox(frame.getAttribute("data-cert"), frame.getAttribute("data-title"));
    });
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });
})();
