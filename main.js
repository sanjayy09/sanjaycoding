(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var navLinks = document.querySelectorAll(".site-nav a");

  function closeNav() {
    document.body.classList.remove("nav-open");
    if (siteNav) siteNav.classList.remove("open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeNav();
    });
  });

  var sections = document.querySelectorAll("section[id]");
  var navAnchors = document.querySelectorAll('.site-nav a[href^="#"]');

  function setActiveNav() {
    var scrollY = window.scrollY + 120;
    var current = "";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        current = section.getAttribute("id") || "";
      }
    });

    navAnchors.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === "#" + current) {
        a.classList.add("active");
      } else {
        a.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
