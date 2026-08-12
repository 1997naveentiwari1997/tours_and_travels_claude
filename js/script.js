(function () {
  "use strict";

  var whatsappNumber = "919310540386"; // TODO: replace with your business WhatsApp number

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- min date = today ---------- */
  var dateInput = document.getElementById("date");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

  /* ---------- header scroll shadow ---------- */
  var header = document.getElementById("site-header");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var primaryNav = document.getElementById("primary-nav");
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var open = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    primaryNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        primaryNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- toast ---------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function showToast(message, isError) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.toggle("error", !!isError);
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 3200);
  }

  /* ---------- booking form ---------- */
  var form = document.getElementById("booking-form");
  if (form) {
    var fields = ["name", "phone", "pickup", "drop", "vehicle", "date", "time"];

    function setError(id, message) {
      var input = document.getElementById(id);
      var errorEl = form.querySelector('[data-error-for="' + id + '"]');
      var wrap = input ? input.closest(".field") : null;
      if (errorEl) errorEl.textContent = message || "";
      if (wrap) wrap.classList.toggle("has-error", !!message);
    }

    function validate() {
      var ok = true;
      var values = {};

      fields.forEach(function (id) { setError(id, ""); });

      var name = document.getElementById("name").value.trim();
      if (!name) { setError("name", "Please enter your name"); ok = false; }
      values.name = name;

      var phone = document.getElementById("phone").value.trim();
      if (!/^\d{10}$/.test(phone.replace(/\D/g, "").slice(-10)) || phone.replace(/\D/g, "").length < 10) {
        setError("phone", "Enter a valid 10-digit phone number"); ok = false;
      }
      values.phone = phone;

      var pickup = document.getElementById("pickup").value.trim();
      if (!pickup) { setError("pickup", "Where should we pick you up?"); ok = false; }
      values.pickup = pickup;

      var drop = document.getElementById("drop").value.trim();
      if (!drop) { setError("drop", "Where are you headed?"); ok = false; }
      values.drop = drop;

      var vehicle = document.getElementById("vehicle").value;
      if (!vehicle) { setError("vehicle", "Pick a vehicle"); ok = false; }
      values.vehicle = vehicle;

      var date = document.getElementById("date").value;
      if (!date) { setError("date", "Pick a travel date"); ok = false; }
      values.date = date;

      var time = document.getElementById("time").value;
      if (!time) { setError("time", "Pick a pickup time"); ok = false; }
      values.time = time;

      values.message = document.getElementById("message").value.trim();

      return { ok: ok, values: values };
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var result = validate();
      if (!result.ok) {
        showToast("Please fix the highlighted fields", true);
        var firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstError) firstError.focus();
        return;
      }
      var v = result.values;
      var msg =
        "Cab Booking Request%0A" +
        "Name: " + v.name + "%0A" +
        "Phone: " + v.phone + "%0A" +
        "Vehicle: " + v.vehicle + "%0A" +
        "Pickup: " + v.pickup + "%0A" +
        "Drop: " + v.drop + "%0A" +
        "Date: " + v.date + "%0A" +
        "Time: " + v.time +
        (v.message ? "%0AMessage: " + v.message : "");

      window.open("https://wa.me/" + whatsappNumber + "?text=" + msg, "_blank");
      showToast("Opening WhatsApp with your booking details…");
    });
  }
})();
