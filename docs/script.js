// ---------- Panel switching (Home / Projects) ----------
console.log("script loaded");

const panels = Array.from(document.querySelectorAll(".panel"));
const goEls = Array.from(document.querySelectorAll("[data-go]"));

function showPanel(id) {
  panels.forEach(p => p.classList.toggle("is-active", p.id === id));
  window.history.replaceState({}, "", `#${id}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

goEls.forEach(el => {
  el.addEventListener("click", (e) => {
    const id = el.getAttribute("data-go");
    if (!id) return;
    e.preventDefault();
    showPanel(id);
  });
});

// ---------- Year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Contact modal ----------
const modal = document.getElementById("contactModal");
const openBtns = Array.from(document.querySelectorAll("[data-modal-open='contact']"));
const closeEls = Array.from(document.querySelectorAll("[data-modal-close]"));

function openModal() {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

openBtns.forEach(btn => btn.addEventListener("click", openModal));
closeEls.forEach(el => el.addEventListener("click", closeModal));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ---------- On load ----------
const initial = (window.location.hash || "#home").slice(1);
if (document.getElementById(initial)) showPanel(initial);
else showPanel("home");
