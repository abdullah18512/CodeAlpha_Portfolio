// ---------- footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const barTop = document.getElementById("barTop");
const barMid = document.getElementById("barMid");
const barBot = document.getElementById("barBot");

let menuOpen = false;

function setMenu(open) {
  menuOpen = open;
  mobileMenu.classList.toggle("hidden", !open);
  menuBtn.setAttribute("aria-expanded", String(open));
  barTop.style.transform = open ? "translateY(4px) rotate(45deg)" : "none";
  barBot.style.transform = open ? "translateY(-4px) rotate(-45deg)" : "none";
  barMid.style.opacity = open ? "0" : "1";
}

menuBtn.addEventListener("click", () => setMenu(!menuOpen));

document.querySelectorAll("[data-nav]").forEach((link) => {
  link.addEventListener("click", () => {
    if (menuOpen) setMenu(false);
  });
});

// ---------- active nav link on scroll ----------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link, .nav-link-mobile");

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const match = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", match);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ---------- contact form validation ----------
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function showError(field, message) {
  const errorEl = form.querySelector(`[data-error-for="${field}"]`);
  const inputEl = form.querySelector(`#${field}`);
  errorEl.textContent = message;
  inputEl.classList.toggle("invalid", Boolean(message));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let valid = true;

  if (!name) {
    showError("name", "Please enter your name.");
    valid = false;
  } else {
    showError("name", "");
  }

  if (!email) {
    showError("email", "Please enter your email.");
    valid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email address.");
    valid = false;
  } else {
    showError("email", "");
  }

  if (!message) {
    showError("message", "Please write a short message.");
    valid = false;
  } else {
    showError("message", "");
  }

  if (!valid) return;

  // No backend is connected yet — this just confirms the form works.
  // Connect a service like Formspree, EmailJS, or your own API to send it for real.
  formStatus.textContent = "Message ready — connect a form backend (e.g. Formspree) to actually send this.";
  form.reset();
});
