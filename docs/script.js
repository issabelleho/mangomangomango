const panels = Array.from(document.querySelectorAll(".panel"));
const navButtons = Array.from(document.querySelectorAll("[data-go]"));
const tiles = Array.from(document.querySelectorAll(".tile"));
const chips = Array.from(document.querySelectorAll("[data-open]"));

function showPanel(id) {
  panels.forEach(p => p.classList.toggle("is-active", p.id === id));
  window.history.replaceState({}, "", `#${id}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openProject(projectId) {
  showPanel("projects");
  const el = document.getElementById(projectId);
  if (!el) return;
  setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
}

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-go");
    showPanel(id);
  });
});

tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    tiles.forEach(t => t.setAttribute("aria-selected", "false"));
    tile.setAttribute("aria-selected", "true");
    openProject(tile.getAttribute("data-project"));
  });
});

chips.forEach(chip => {
  chip.addEventListener("click", () => openProject(chip.getAttribute("data-open")));
});

// hash routing on load
const hash = (window.location.hash || "#home").replace("#", "");
if (document.getElementById(hash)) showPanel(hash);
else showPanel("home");

// footer year
document.getElementById("year").textContent = new Date().getFullYear();
