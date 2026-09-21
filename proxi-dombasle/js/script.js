(function () {
  "use strict";

  /* ---------- Année footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header : ombre au scroll ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (window.scrollY > 12) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      header.classList.toggle("nav-open");
    });
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        header.classList.remove("nav-open");
      });
    });
  }

  /* ---------- Horaires dynamiques ---------- */
  // 0 = dimanche ... 6 = samedi
  var hoursByDay = {
    0: [{ open: 10 * 60, close: 26 * 60 }],                                  // dimanche 10h-02h(+1)
    1: [{ open: 10 * 60, close: 14 * 60 }, { open: 17 * 60, close: 24 * 60 }], // lundi 10h-14h / 17h-00h
    2: [{ open: 10 * 60, close: 14 * 60 }, { open: 17 * 60, close: 24 * 60 }], // mardi 10h-14h / 17h-00h
    3: [{ open: 10 * 60, close: 14 * 60 }, { open: 17 * 60, close: 24 * 60 }], // mercredi 10h-14h / 17h-00h
    4: [{ open: 10 * 60, close: 14 * 60 }, { open: 17 * 60, close: 24 * 60 }], // jeudi 10h-14h / 17h-00h
    5: [{ open: 10 * 60, close: 26 * 60 }],                                  // vendredi 10h-02h(+1)
    6: [{ open: 10 * 60, close: 26 * 60 }]                                   // samedi 10h-02h(+1)
  };
  var dayLabels = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

  function isOpenNow() {
    var now = new Date();
    var day = now.getDay();
    var minutes = now.getHours() * 60 + now.getMinutes();

    function checkDay(d, mins) {
      var ranges = hoursByDay[d];
      for (var i = 0; i < ranges.length; i++) {
        if (mins >= ranges[i].open && mins < ranges[i].close) return true;
      }
      return false;
    }

    if (checkDay(day, minutes)) return true;
    // Vérifie la plage de la veille qui déborde après minuit (ex : ven 10h-02h)
    var prevDay = (day + 6) % 7;
    var prevRanges = hoursByDay[prevDay];
    for (var j = 0; j < prevRanges.length; j++) {
      if (prevRanges[j].close > 24 * 60) {
        var closeAfterMidnight = prevRanges[j].close - 24 * 60;
        if (minutes < closeAfterMidnight) return true;
      }
    }
    return false;
  }

  var statusEl = document.querySelector(".hours-status");
  if (statusEl) {
    var open = isOpenNow();
    statusEl.classList.add(open ? "open" : "closed");
    statusEl.innerHTML =
      '<span class="dot"></span>' + (open ? "Ouvert actuellement" : "Fermé actuellement");
  }

  var today = new Date().getDay();
  var todayName = dayLabels[today];
  document.querySelectorAll(".hours-list li").forEach(function (li) {
    if (li.dataset.day === todayName) li.classList.add("today");
  });

  /* ---------- Galerie / Lightbox ---------- */
  var galleryLinks = Array.prototype.slice.call(document.querySelectorAll(".gallery-grid a"));
  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  var lightboxCounter = lightbox ? lightbox.querySelector(".lightbox-counter") : null;
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    var link = galleryLinks[currentIndex];
    lightboxImg.src = link.getAttribute("href");
    lightboxImg.alt = link.querySelector("img").alt || "";
    if (lightboxCounter) {
      lightboxCounter.textContent = (currentIndex + 1) + " / " + galleryLinks.length;
    }
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function showRelative(delta) {
    currentIndex = (currentIndex + delta + galleryLinks.length) % galleryLinks.length;
    openLightbox(currentIndex);
  }

  galleryLinks.forEach(function (link, index) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      openLightbox(index);
    });
  });

  if (lightbox) {
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", function () { showRelative(-1); });
    lightbox.querySelector(".lightbox-next").addEventListener("click", function () { showRelative(1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showRelative(1);
      if (e.key === "ArrowLeft") showRelative(-1);
    });
  }

  /* ---------- Bandeau cookies ---------- */
  var cookieBanner = document.querySelector(".cookie-banner");
  var CONSENT_KEY = "proxi-dombasle-cookie-consent";

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (err) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (err) { /* ignore */ }
  }

  if (cookieBanner && !getConsent()) {
    cookieBanner.classList.add("is-visible");
  }

  document.querySelectorAll("[data-cookie-action]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setConsent(btn.getAttribute("data-cookie-action"));
      cookieBanner.classList.remove("is-visible");
    });
  });
})();
